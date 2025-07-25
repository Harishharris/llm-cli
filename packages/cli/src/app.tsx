import { Text, Static } from 'ink';
import { InputPrompt } from './components/inputPrompt.js';
import { Header } from './header.js';
import { Config } from '@simple-cli/core'
import { useAuth } from './hooks/useAuth.js';
import { AuthError } from './components/AuthError.js';
import useGeminiStream from './hooks/useGeminiStream.js';
import { useHistory } from './hooks/useHistory.js';
import { HistoryItem } from './components/HistoryItem.js';

type Props = {
	config: Config
};

export default function App({ config }: Props) {
	const { authError } = useAuth({ config })
	const { messages, addItem } = useHistory()
	const {
		submitQuery,
		currentMessage,
		isStreaming
	} = useGeminiStream(
		config.getGeminiClient()!,
		addItem
	)

	// console.log("MESSAGES", currentMessage)

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
			{/* {currentMessage?.map((item, index) => (
				<HistoryItem
					item={item}
					key={index}
				/>
			))} */}
			<HistoryItem item={currentMessage} key={Date.now()} />
			{authError && <AuthError authError={authError} />}
			{!authError && !isStreaming && <InputPrompt
				onSubmit={submitQuery}
				addItem={addItem}
			/>}
		</>
	);
}


