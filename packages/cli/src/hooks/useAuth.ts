import process from "node:process"
import { useEffect, useState } from "react"
import { Config } from "@simple-cli/core"

export function useAuth({ config }: { config: Config }) {
	const [authError, setAuthError] = useState('')
	const GEMINI_API_KEY = process.env["GEMINI_API_KEY"]

	useEffect(() => {
		if (!GEMINI_API_KEY) {
			setAuthError("Please specify your API_KEY in .env file in the root of the project")
		}
		config.refreshAuth()
		console.log('in effect', config.getGeminiClient());
	}, [])

	return {
		authError
	}

}
