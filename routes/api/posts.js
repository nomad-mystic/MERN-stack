const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Our modules
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts Works!!"}));

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route POST api/posts
 * @desc Create post
 * @access Private
 * @return {object} res
 */

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	// if any errors
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id,
	});

	newPost.save().then(post => res.json(post)).catch(err => res.status(404).json(err));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/posts
 * @desc Get posts
 * @access Public
 * @return {object} res
 */

router.get('/', (req, res) => {
	Post.find()
		.sort({data: -1})
		.then(posts => {
			return res.json(posts);
		})
		.catch(err => res.status(404).json(err));
});


/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route GET api/posts/:id
 * @desc Get posts by id
 * @access Public
 * @return {object} res
 */

router.get('/:id', (req, res) => {
	console.log(req.params.id);
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({noPostFound: 'No Post Found with that ID'}));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route DELETE api/posts/:id
 * @desc  Delete Post
 * @access Private
 * @return {object} res
 */

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.user.toString() !== req.user.id) {
						return res.status(401).json({notAuthorized: 'User not authorized'});
					}

					// Delete
					post.remove().then(() => res.json({success: true})).catch(err => res.status(404).json({postNotFound: 'Post Not found!'}));
				})
				.catch(err => res.status(404).json(err));
		})
		.catch(err => res.status(404).json({err: 'User not found'}));
});

module.exports = router;
