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

	console.log(response.data);
}

// send authentication request to firebase

export async function createUser(email, password) {
	await authenticate("signUp", email, password);
}

export async function login(email, password) {
	await authenticate("signInWithPassword", email, password);
}
