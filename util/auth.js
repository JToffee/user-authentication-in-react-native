// i am using firebase authentication services and the firebase auth REST API to authenticate users/
// using axios for HTTP requests

import axios from "axios";

const API_KEY = "AIzaSyDfkdiCqfaJa3cg1NK3ZAMI3dztDfK1S3g";

//Authenticate user

async function authenticate(mode, email, password) {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

	const response = await axios.post(url, {
		email: email,
		password: password,
		returnSecureToken: true,
	});

	const token = response.data.idToken;

	return token;
}

// send authentication request to firebase

export function createUser(email, password) {
	return authenticate("signUp", email, password);
}

export function login(email, password) {
	return authenticate("signInWithPassword", email, password);
}
