const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// My modules
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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
		.populate('user', ['name', 'avatar'])
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

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route POST api/profile
 * @desc Create or edit user profile
 * @access Private
 * @return {object} res
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateProfileInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Get fields
	const profileFields = {};
	profileFields.user = req.user.id;

	if (req.body.handle) profileFields.handle = req.body.handle.toString().trim();
	if (req.body.company) profileFields.company = req.body.company.toString().trim();
	if (req.body.website) profileFields.website = req.body.website.toString().trim();
	if (req.body.location) profileFields.location = req.body.location.toString().trim();
	if (req.body.status) profileFields.status = req.body.status.toString().trim();
	if (req.body.bio) profileFields.bio = req.body.bio.toString().trim();
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername.toString().trim();

	// Skills - Split into array
	if (typeof req.body.skills !== 'undefined') {
		// profileFields.skills = req.body.skills.split(',');
		let splitArray = req.body.skills.split(',');
		profileFields.skills = splitArray.map(Function.prototype.call, String.prototype.trim);
	}

	// social
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile.findOne({user: req.user.id})
		.then(profile => {
			if (profile) {
				// update
				Profile.findOneAndUpdate(
					{user: req.user.id,},
					{$set: profileFields,},
					{new: true,}
				)
				.then(profile => res.json(profile))
				.catch(err => res.status(404).json(err))
			} else {
				// create

				// Check if Handle
				Profile.findOne({handle: profileFields.handle}).then(profile => {
					if (profile) {
						errors.handle = 'That handle all ready exists';
						return res.status(404).json(errors);
					}

					new Profile(profileFields)
						.save()
						.then(profile => res.json(profile))
						.catch(err => res.status(404).json(err))
				})
			}
		})
		.catch(err => {
			res.status(404).json(err);
		});
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/profile/all
 * @desc Get all the profiles
 * @access Public
 * @return {object} res
 */

router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles.';
				res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch(err => res.status(404).json({profile: 'There are no profiles.'}));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/profile/handle/:handle
 * @desc Get the profile by handle
 * @access Public
 * @return {object} res
 */

router.get('/handle/:handle', (req, res) => {
	const errors = {};

	Profile.findOne({handle: req.params.handle})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is not profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/profile/user/:user_id
 * @desc Get the profile by id
 * @access Public
 * @return {object} res
 */

router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({user: req.params.user_id})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is not profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route POST api/profile/experience
 * @desc Add experience to profile
 * @access Private
 * @return {object} res
 */

router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateExperienceInput(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({user: req.user.id })
		.then(profile => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};

			// Add to exp array
			profile.experience.unshift(newExp);
			profile.save().then(profile => res.json(profile)).catch(err => res.status(400).json({err}));
		})
		.catch(err => res.status(404))
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route DELETE api/profile/experience/:exp_id
 * @desc  Delete experience to profile
 * @access Private
 * @return {object} res
 */

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			// Get remove index
			const removeIndex = profile.experience
				.map(item => item.id)
				.indexOf(req.params.exp_id);

			profile.experience.splice(removeIndex, 1);

			profile.save().then(profile => res.json(profile)).catch(err => res.status(400).json({err}));
		})
		.catch(err => res.status(404).json(err));
});


/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route POST api/profile/education
 * @desc Add education to profile
 * @access Private
 * @return {object} res
 */

router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateEducationInput(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({user: req.user.id })
		.then(profile => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldOfStudy: req.body.fieldOfStudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};

			// Add to exp array
			profile.education.unshift(newEdu);

			profile.save().then(profile => res.json(profile)).catch(err => res.status(400).json({err}));
		})
		.catch(err => res.status(404))
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route DELETE api/profile/education/:edu_id
 * @desc  Delete education to profile
 * @access Private
 * @return {object} res
 */

router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			// Get remove index
			const removeIndex = profile.education
				.map(item => item.id)
				.indexOf(req.params.edu_id);

			profile.education.splice(removeIndex, 1);

			profile.save().then(profile => res.json(profile)).catch(err => res.status(400).json({err}));
		})
		.catch(err => res.status(404).json(err));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route DELETE api/profile
 * @desc  Delete profile and user
 * @access Private
 * @return {object} res
 */

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOneAndRemove({user: req.user.id})
		.then(() => {
			User.findOneAndRemove({_id: req.user.id})
				.then(() => {
					res.json({success: true});
				})
				.catch(err => res.status(404).json({err}));
		})
		.catch(err => res.status(404).json(err));
});

module.exports = router;
