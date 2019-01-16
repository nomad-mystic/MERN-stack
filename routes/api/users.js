const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const keys = require('../../config/keys');

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users Works!!"}));


/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/users/register
 * @desc Registers user
 * @access Public
 * @return {object} res
 */
router.post('/register', (req, res) => {
	User.findOne({
		email: req.body.email,
	})
	.then((user) => {
		if (user) {
			return res.status(400).json({email: 'Email already exists'});
		} else {
			const avatar = gravatar.url(req.body.email, {
				r: 'pg', // Rating
				s: '200', // size
				d: 'mm', // Default
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password,
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						throw err;
					}
					newUser.password = hash;
					newUser.save()
						.then(user => res.json(user))
						.catch(err => err);
				});
			});
		}
	})
	.catch((err) => {
		throw err;
	});
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/users/login
 * @desc Registers Login
 * @access Public
 * @return {string} token
 */

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// find by user email
	User.findOne({email: email})
		.then((user) => {
			// check for user
			if (!user) {
				console.log('testing');
				return res.status(404).json({email: 'User not found'});
			}

			bcrypt.compare(password, user.password)
				.then((isMatch) => {
					if (isMatch) {
						// res.json({msg: 'success'});
						// user Matched
						const payload = {
							id: user.id,
							name: user.name,
							avatar: user.avatar,
						};

						// Sign Token
						jwt.sign(
							payload,
							keys.secret,
							{ expiresIn: 3600, },
							(err, token) => {
								res.json({
									success: true,
									token: `Bearer ${token}`,
								});
							}
						);
					} else {
						return res.status(400).json({password: 'Password incorrect'});
					}
				})
				.catch((err) => {
					throw err;
				});
		});

});

module.exports = router;
