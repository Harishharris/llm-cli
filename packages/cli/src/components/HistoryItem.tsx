import {Box, Text} from 'ink';
import {Message} from '../hooks/useHistory.js';

export function HistoryItem({item}: {item: Message | undefined}) {
	// console.log('inside history item', item);
	if (!item || !item.content) {
		return null;
	}

	return (
		<>
			{item.type === 'user' && (
				<Box
					borderColor={'blue'}
					borderStyle="round"
					flexDirection="row"
					paddingX={1}
				>
					<Text>&gt; </Text>
					<Text wrap="wrap">{item.content}</Text>
				</Box>
			)}
			{item.type === 'gemini' && (
				<Box marginBottom={1} gap={1}>
					<Box width={2}>
						<Text color="green"> {'✦'}</Text>
					</Box>
					<Box flexGrow={1}>
						<Text wrap="wrap">{item.content}</Text>
					</Box>
				</Box>
			)}
			{item.type === 'system' && (
				<Box marginBottom={1} gap={1}>
					<Box width={2}>
						<Text color="green"> {'✦'}</Text>
					</Box>
					<Box flexGrow={1}>
						<Text wrap="wrap">{item.content}</Text>
					</Box>
				</Box>
			)}
		</>
	);
}
