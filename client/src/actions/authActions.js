import axios from 'axios';
import jwt_decode from 'jwt-decode';

// My Modules
import setAuthToken from "../utils/setAuthToken";

// types
import {GET_ERRORS, SET_CURRENT_USER} from "./types";

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @param {object} userData
 * @param {object} history
 * @returns {{type: string, payload: *}} | void
 */
export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
		.then(res => {
			history.push('/login');
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @param {object} userData
 * @returns {Function}
 */
export const loginUser = (userData) => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			// Save to local storage
			const { token } = res.data;
			// Set token to ls
			localStorage.setItem('jwtToken', token);
			// Set to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		});
};

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @param decoded
 * @returns {{type: string, payload: *}}
 */
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	}
};
