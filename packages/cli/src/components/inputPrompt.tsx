import { useState } from "react";
import { Text, useInput, Box } from "ink";
import { Message } from "../hooks/useHistory.js";

// interface AddItemProp {
// 	addItem(mode: "user" | "assistant", input: string): void;
// }

interface InputPromptProps {
	onSubmit: (query: string) => void;
	addItem: (event: Message) => void;
}

export function InputPrompt({ onSubmit, addItem }: InputPromptProps) {
	const [prompt, setPrompt] = useState('');
	const [_error, setError] = useState(false)
	const [_errMessage, _setErrMessage] = useState('');
	const [_submitted, setSubmitted] = useState(false);

	const placeholder = " Ask your question";

	useInput((input, key) => {
		if (key.return) {
			// addItem('user', prompt);
			if (prompt.trim()) {
				addItem({ type: 'user', content: prompt })
				onSubmit(prompt)
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
