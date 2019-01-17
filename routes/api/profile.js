const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// My modules
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile Works!!"}));

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/profile
 * @desc Get the current users profile
 * @access Private
 * @return {object} res
 */

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const errors = {};
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no Profile';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => {
			res.status(404).json(err);
		});
});




module.exports = router;
