/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @param value
 * @returns {boolean}
 */
const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	)
};

export default isEmpty;
