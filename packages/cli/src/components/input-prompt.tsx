import { Dispatch, SetStateAction, useState } from "react";
import { Text, useInput, Box } from "ink";

// interface AddItemProp {
// 	addItem(mode: "user" | "assistant", input: string): void;
// }

interface InputPromptProps {
	onSubmit: (query: string) => void;
	setMessages: Dispatch<SetStateAction<string[]>>
}

export function InputPrompt({ onSubmit, setMessages }: InputPromptProps) {
	const [prompt, setPrompt] = useState('');
	const [_error, setError] = useState(false)
	const [_errMessage, _setErrMessage] = useState('');
	const [_submitted, setSubmitted] = useState(false);

	const placeholder = " Ask your question";

	useInput((input, key) => {
		if (key.return) {
			console.log('ENTERED PROMPT', prompt)
			// addItem('user', prompt);
			if (prompt.trim()) {
				onSubmit(prompt)
				setMessages(prev => [...prev, prompt])
				setPrompt('')
				return;
			}
			setPrompt('')
			setSubmitted(true);
			setError(false);
			return;
		}
		if (key.meta && key.backspace || key.delete) {
			setPrompt(prompt.split(' ').slice(0, -1).join(' '));
			return;
		}
		if (key.backspace) {
			setPrompt(prev => prev.slice(0, -1));
			return;
		}
		setPrompt(prev => prev + input);
		setSubmitted(false);
	})

	return (
		<Box borderStyle="round" flexGrow={1} flexDirection="column" paddingLeft={1}>
			<Box flexDirection="row">
				<Text>&gt;</Text>
				<Box paddingLeft={1}>
					{/* <Text backgroundColor="white">{" "}</Text> */}
					{prompt
						? <Text>{prompt}</Text>
						: <Text color="gray">{placeholder}</Text>}
				</Box>
			</Box>
		</Box>
	);
}
