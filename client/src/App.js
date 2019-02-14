// libs
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

// redux
import store from './store';

// styles
import './App.css';

// layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';


/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @desc This is the main class for our whole application
 */
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar/>
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
						</div>
						<Footer/>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
