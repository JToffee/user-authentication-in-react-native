import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native-web";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const authCtx = useContext(AuthContext);

	async function signupHandler({ email, password }) {
		try {
			setIsAuthenticating(true);
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				"Authentication failed",
				"Please check your input and try again."
			);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Creating your account..." />;
	}
	return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
