const initialState = {
	isAuthenticated: false,
	user: {},
};

/**
 *
 * @param {object} state
 * @param {string} action
 * @returns {object}
 */
export default function (state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
};
