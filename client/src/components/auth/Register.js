import React, {Component} from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {

	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
			errors: {},
		};

		// Bind our methods
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			passwordConfirm: this.state.passwordConfirm,
		};

		axios.post('/api/users/register', newUser)
			.then(result => {
				console.log(result.data);
			})
			.catch(err => {
				console.log(err.response.data);
				this.setState({errors: err.response.data});
			});
	}

	render() {
		const {errors} = this.state;

		return (
			<div className="Register">
				<div className="register">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">Sign Up</h1>
								<p className="lead text-center">Create your DevConnector account</p>
								<form noValidate onSubmit={this.onSubmit}>
									<div className="form-group">
										<input type="text"
										       className={classnames('form-control form-control-lg', {
										       	'is-invalid': errors.name,
										       })}
										       placeholder="Name"
										       name="name"
										       value={this.state.name}
										       onChange={this.onChange}
										/>
										{errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
									</div>
									<div className="form-group">
										<input type="email"
										       className={classnames('form-control form-control-lg', {
										       	    'is-invalid': errors.email,
										       })}
										       placeholder="Email Address"
										       name="email"
										       value={this.state.email}
										       onChange={this.onChange}
										/>
										{errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
										<small className="form-text text-muted">This site uses Gravatar so if you want a
											profile image, use a Gravatar email
										</small>
									</div>
									<div className="form-group">
										<input
											type="password"
											className={classnames('form-control form-control-lg', {
												'is-invalid': errors.password,
											})}
											placeholder="Password"
											name="password"
											value={this.state.password}
											onChange={this.onChange}
										/>
										{errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
									</div>
									<div className="form-group">
										<input type="password"
										       className={classnames('form-control form-control-lg', {
										       	    'is-invalid': errors.passwordConfirm,
										       })}
										       placeholder="Confirm Password"
										       name="passwordConfirm"
										       value={this.state.passwordConfirm}
										       onChange={this.onChange}
										/>
										{errors.passwordConfirm && (<div className="invalid-feedback">{errors.passwordConfirm}</div>)}
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

export default Register;