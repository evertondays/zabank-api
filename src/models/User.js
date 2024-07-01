class User {
	constructor(name, email, password) {
		this.name = name;
		this.password = password;
		this.email = email;

		this.email = email ? email.trim().toLowerCase() : null;
	}

	validate() {
		if (!this.name || this.name.length <= 1) {
			return "O nome é necessário";
		}

		if (!this.email || this.email.length <= 1) {
			return "O email é necessário";
		}

		if (!this.password || this.password.length < 8) {
			return "A senha deve conter pelo menos 8 caracteres";
		}

		return false;
	}
}

module.exports = User;
