import {useEffect, useState} from 'react';
import process from 'node:process';

export function useTerminal() {
	const [size, setSize] = useState({
		columns: process.stdout.columns || 20,
		rows: process.stdout.rows || 20,
	});

	useEffect(() => {
		const updateSize = () => {
			setSize(() => ({
				columns: process.stdout.columns || 20,
				rows: process.stdout.rows || 20,
			}));
		};

		process.stdout.on('resize', updateSize);

		return () => {
			process.stdout.off('resize', updateSize);
		};
	}, []);

	return {
		...size,
	};
}
