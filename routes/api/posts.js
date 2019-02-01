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

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route POST api/posts/like/:id
 * @desc   Like Post
 * @access Private
 * @return {object} res
 */

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
						return res.status(400).json({alreadyLiked: 'User already like this post'});
					}

					// Add user id to likes array
					post.likes.unshift({user: req.user.id});
					post.save().then(post => res.json(post)).catch(err => res.status(400).json(err));
				})
				.catch(err => res.status(404).json(err));
		})
		.catch(err => res.status(404).json({err: 'User not found'}));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route POST api/posts/unlike/:id
 * @desc  Unlike Post
 * @access Private
 * @return {object} res
 */

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
						return res.status(400).json({notLiked: 'You have not yet like this post'});
					}

					// Get remove index
					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
					// Remove from array
					post.likes.splice(removeIndex, 1);

					post.save().then(post => res.json(post)).catch(err => res.status(400).json(err));
				})
				.catch(err => res.status(404).json(err));
		})
		.catch(err => res.status(404).json({err: 'User not found'}));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route POST api/posts/comment/:id
 * @desc Comment on Post
 * @access Private
 * @return {object} res
 */

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			post.save()
				.then(post => res.status(200).json(post))
				.catch(err => res.status(400).json({noPostFound: 'No Post Found'}));
		})
		.catch(err => res.status(404).json(err));
});

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @route DELETE api/posts/comment/:id/:comment_id
 * @desc Remove comment for post
 * @access Private
 * @return {object} res
 */

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			// Check if the comment exists
			if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({commentNotExists: 'Comment does not exist'});
			}

			// Get remove index
			const removeIndex = post.comments
				.map(item => item._id.toString())
				.indexOf(req.params.comment_id);

			// Remove from array
			post.comments.splice(removeIndex, 1);

			post.save().then(post => res.status(200).json(post)).catch(err => res.status(500).json(err));
		})
		.catch(err => res.status(404).json(err));
});

module.exports = router;
