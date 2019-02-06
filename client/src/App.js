import React, { Component } from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @desc
 */
class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar/>
				<Landing/>
				<Footer/>
			</div>
		);
	}
}

export default App;