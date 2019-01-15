const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users Works!!"}));


/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/users/register
 * @desc Registers user
 * @access Public
 * @return {object} res | void
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
});

module.exports = router;
