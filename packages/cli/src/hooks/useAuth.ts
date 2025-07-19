import process from "node:process"
import { useEffect, useState } from "react"
import { Config } from "@simple-cli/core"

export function useAuth({ config }: { config: Config }) {
	const [authError, setAuthError] = useState('')
	const [_authenticating, setIsAuthenticating] = useState(false);
	const GEMINI_API_KEY = process.env["GEMINI_API_KEY"]

	useEffect(() => {
		const authFlow = async () => {
			setIsAuthenticating(true);
			if (!GEMINI_API_KEY) {
				setAuthError("Please specify your API_KEY in .env file in the root of the project")
				return;
			}
			await config.refreshAuth()
			setAuthError('')
			setIsAuthenticating(false);
			// console.log('in effect', config.getGeminiClient());
		}

		void authFlow();
	}, [config])

	return {
		authError
	}

}
