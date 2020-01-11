let selAllUsers 	= "SELECT * FROM `users`";
let selUserByUname 	= "SELECT * FROM `users` WHERE `username` = ?";
let selUserById 	= "SELECT * FROM `users` WHERE `user_id` = ?";
let insUser 		= "INSERT INTO `users` (`username`, `password`) VALUES (?, ?)";

module.exports = {
	selAllUsers,
	selUserByUname,
	selUserById,
	insUser
};