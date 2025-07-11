import { Text } from 'ink';
import { InputPrompt } from './components/input-prompt.js';
import { Header } from './header.js';
import { Config } from '@simple-cli/core'
import { useAuth } from './hooks/useAuth.js';
import { AuthError } from './components/AuthError.js';

type Props = {
	config: Config
};

export default function App({ config }: Props) {
	const { authError } = useAuth({ config })
	console.log('Config:', config);

	return (
		<>
			<Header />
			<Text>
				Hello, <Text color="green">Harish</Text>
			</Text>
			{authError && <AuthError authError={authError} />}
			{!authError && <InputPrompt />}
		</>
	);
}
