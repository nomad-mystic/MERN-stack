import axios from 'axios';

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @param token
 * @return void
 */
const setAuthToken = token => {
	if (token) {
		// Apply to every request
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
