import {GET_ERRORS} from "../actions/types";

const initialState = {};

/**
 *
 * @param {object} state
 * @param {string} action
 * @returns {object}
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};
