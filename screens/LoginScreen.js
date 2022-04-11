import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const authCtx = useContext(AuthContext);

	async function loginHandler({ email, password }) {
		try {
			setIsAuthenticating(true);
			const token = await login(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				"Authentication failed",
				"Please check your credentials or try agin later" + error.message
			);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Logging you in..." />;
	}
	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
