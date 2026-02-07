import Gradient from "ink-gradient"
import { Box, Text } from 'ink'
import { LOGO } from './asciiText.js'

export function Header() {
	return (
		<>
			<Box flexDirection="row" alignItems='center'>
				<Gradient name='morning'>
					<Text>{LOGO}</Text>
				</Gradient>
			</Box>

			<Gradient name='atlas'>
				<Text bold>
					———Harish, Software Developer
				</Text>
			</Gradient>

		</>
	)
}
