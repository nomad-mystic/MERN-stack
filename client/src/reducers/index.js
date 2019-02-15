import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducers from './errorReducers';

/**
 * @return {function} combineReducers
 */
export default combineReducers ({
	auth: authReducer,
	errors: errorReducers,
});
