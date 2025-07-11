import { useState, useEffect } from "react";

export function useAuthCommand() {
	const [isAuthenticating, _setIsAuthenticating] = useState(false);

	useEffect(() => {

	}, []);

	return {
		isAuthenticating,
	}
}
