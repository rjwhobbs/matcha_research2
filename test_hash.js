const bcrypt = require('bcrypt');

let passwd = "pass";
const rounds = 10

const hashPassword = async () => {
	const hash = await bcrypt.hash(passwd, rounds)
	console.log(hash)
	console.log(await bcrypt.compare(passwd, hash))
}
  
hashPassword();
  