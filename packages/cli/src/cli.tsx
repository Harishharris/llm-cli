import { render } from 'ink';
import { main } from './config/main.js';
import App from './app.js';

export function cli() {
	const config = main()

	render(
		<App
			config={config}
		/>
	)
}

