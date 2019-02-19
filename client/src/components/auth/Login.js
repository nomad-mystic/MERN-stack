import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {setCurrentUser} from "../../actions/authActions";

class Login extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();

		const user = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.setCurrentUser(user);

	}

	render() {
		return (
			<div className="Login">
				<div className="login">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">Log In</h1>
								<p className="lead text-center">Sign in to your DevConnector account</p>
								<form onSubmit={this.onSubmit}>
									<div className="form-group">
										<input type="email"
										       className="form-control form-control-lg"
										       placeholder="Email Address"
										       name="email"
										       value={this.state.email}
										       onChange={this.onChange}
										/>
									</div>
									<div className="form-group">
										<input type="password"
										       className="form-control form-control-lg"
										       placeholder="Password"
										       name="password"
										       value={this.state.password}
										       onChange={this.onChange}
										/>
									</div>
									<input type="submit" className="btn btn-info btn-block mt-4"/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	setCurrentUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, {setCurrentUser})(withRouter(Login));
