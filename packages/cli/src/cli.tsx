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

// import { useState, useEffect } from 'react';
// import { render, Text, Static } from 'ink';
// const App = () => {
// 	const [items, setItems] = useState<string[]>([]);

// 	useEffect(() => {
// 		let i = 0;
// 		const timer = setInterval(() => {
// 			if (i >= 20) return clearInterval(timer);
// 			setItems((prev) => [...prev, `Item #${i}`]);
// 			i++;
// 		}, 300);
// 	}, []);

// 	return (
// 		<Static items={items}>
// 			{(item, index) => <Text key={index}>{item}</Text>}
// 		</Static>
// 	);
// };

// render(<App />);
