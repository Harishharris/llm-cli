import { Text } from "ink"

interface AuthErrorProps {
	authError: string
}

export function AuthError({ authError }: AuthErrorProps) {
	return (
		<Text color='red'>{authError}</Text>
	)
}
