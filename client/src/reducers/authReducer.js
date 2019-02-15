import {SET_CURRENT_USER} from '../reducers/authReducer';
import isEmpty from '../validation/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {},
};

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @param {object} state
 * @param {string} action
 * @returns {object}
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		default:
			return state;
	}
};
