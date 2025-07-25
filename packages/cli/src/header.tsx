import Gradient from "ink-gradient"
import BigText from 'ink-big-text'
import { Box, Text } from 'ink'
import { greaterThan } from './asciiText.js'

export function Header() {
	return (
		<>
			<Box flexDirection="row" alignItems='center'>
				<Gradient name='morning'>
					<Text>{greaterThan} </Text>
				</Gradient>
				<Gradient name='morning'>
					<BigText text="Hello" font="block" />
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
