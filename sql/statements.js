let selAllUsers = "SELECT * FROM `users`";
let selUser = "SELECT * FROM `users` WHERE `username` = ?";
let selUserById = "SELECT * FROM `users` WHERE `user_id` = ?";

module.exports = {
	selAllUsers,
	selUser,
	selUserById
};