import {combineReducers} from 'redux';
import authReducer from './authReducer';

/**
 * @return {function} combineReducers
 */
export default combineReducers ({
	auth: authReducer,
});
