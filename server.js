const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// My modules
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Init App
const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
	.connect(db, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log('MongoDB Connected')
	})
	.catch((err) => {
		console.log(err);
	});

// passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server Running ${port}`));

module.exports = server;
