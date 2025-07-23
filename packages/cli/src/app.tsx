import { Text, Static } from 'ink';
import { InputPrompt } from './components/input-prompt.js';
import { Header } from './header.js';
import { Config } from '@simple-cli/core'
import { useAuth } from './hooks/useAuth.js';
import { AuthError } from './components/AuthError.js';
import useGeminiStream from './hooks/useGeminiStream.js';
import { uesHistory } from './hooks/useHistory.js';
import { HistoryItem } from './components/HistoryItem.js';

type Props = {
	config: Config
};

export default function App({ config }: Props) {

	const { authError } = useAuth({ config })
	const { messages, addItem } = uesHistory()
	const { submitQuery,
		isResponding,
		// currentMessage
	} = useGeminiStream(
		config.getGeminiClient()!,
		// setMessages,
		addItem
	)
	// console.log("MESSAGES", messages)

	return (
		<>
			<Static key={0} items={[
				<Header key="header" />,
				<Text key="greeting">
					Hello, <Text color="green">Harish</Text>
				</Text>,
				...messages.map((item, index) => (
					<HistoryItem
						item={item}
						key={index}
					/>
				))
			]}>
				{(item) => item}
			</Static >
			{/* {currentMessage.map((item, index) => (
				<HistoryItem
					item={item}
					key={index}
				/>
			))} */}
			{authError && <AuthError authError={authError} />}
			{!authError && !isResponding && <InputPrompt
				onSubmit={submitQuery}
				addItem={addItem}
			/>}
		</>
	);
}


