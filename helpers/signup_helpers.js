function uNameCheck(username) {
	let check = username.match(/^[a-zA-Z0-9]+$/);
	if (check === null || isNaN(username) === false || username.length < 3) {
		return false;
	}
	return true;
} 

module.exports = {
	uNameCheck
}