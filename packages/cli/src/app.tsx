import { Text, Box } from 'ink';
import { InputPrompt } from './components/input-prompt.js';
import { Header } from './header.js';
import { Config } from '@simple-cli/core'
import { useAuth } from './hooks/useAuth.js';
import { AuthError } from './components/AuthError.js';
import useGeminiStream from './hooks/useGeminiStream.js';
import { uesHistory } from './hooks/useHistory.js';

type Props = {
	config: Config
};

export default function App({ config }: Props) {
	const { authError } = useAuth({ config })
	const { messages, setMessages } = uesHistory()
	// console.log(messages)
	const { submitQuery, isResponding } = useGeminiStream(config.getGeminiClient()!, setMessages)

	return (
		<>
			<Header />
			<Text>
				Hello, <Text color="green">Harish</Text>
			</Text>
			{messages.map((item, index) => (
				<Box key={index}>
					<Text>{item}</Text>
				</Box>
			))}
			{authError && <AuthError authError={authError} />}
			{!authError && !isResponding && <InputPrompt
				onSubmit={submitQuery}
				setMessages={setMessages}
			/>}
		</>
	);
}
