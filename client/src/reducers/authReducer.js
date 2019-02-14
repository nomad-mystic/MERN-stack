const initialState = {
	isAuthenticated: false,
	user: {},
};

/**
 *
 * @param state
 * @param action
 * @returns {{isAuthenticated: boolean, user: {}}}
 */
export default function (state = initialState, action) {
	switch (action.type) {
		// case SET_CURRENT_USER:
		// 	return
		default:
			return state;
	}
};
