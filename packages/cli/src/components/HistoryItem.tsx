import { Box, Text } from 'ink'
import { Message } from '../hooks/useHistory.js'

export function HistoryItem({ item }: { item: Message }) {
	return (
		item.type === 'user' ? (
			<Box borderColor={'blue'} borderStyle="round" flexDirection='row' paddingX={1}>
				<Text>&gt; {" "}</Text>
				<Text>{item.content}</Text>
			</Box>
		) : (
			<Box marginLeft={1} marginBottom={1} gap={1}>
				<Text color="green"> {"✦"}</Text>
				<Text>{item.content}</Text>
			</Box>
		)
	)
}
