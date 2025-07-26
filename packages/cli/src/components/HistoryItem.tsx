import { Box, Text } from 'ink'
import { Message } from '../hooks/useHistory.js'

export function HistoryItem({ item }: { item: Message | undefined }) {
	// console.log('inside history item', item)
	if (!item || !item.content) {
		return null;
	}

	return (
		<>
			{item.type === 'user' && (
				<Box borderColor={'blue'} borderStyle="round" flexDirection='row' paddingX={1}>
					<Text>&gt; {" "}</Text>
					<Text>{item.content}</Text>
				</Box>
			)}
			{item.type === 'gemini' && (
				<Box marginLeft={1} marginBottom={1} gap={1}>
					<Text color="green"> {"✦"}</Text>
					<Text>{item.content}</Text>
				</Box>
			)}
			{item.type === 'system' && (
				<Box marginLeft={1} marginBottom={1} gap={1}>
					<Text color="red">{"✦"}</Text>
					<Text>{item.content}</Text>
				</Box>
			)}
		</>
	)
}
