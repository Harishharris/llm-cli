import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

await build({
	entryPoints: ['packages/cli/index.ts'],
	bundle: true,
	platform: 'node',
	target: 'node20',
	format: 'esm',
	outfile: 'bundle/cli.js',
	banner: {
		js: `#!/usr/bin/env node\nimport { createRequire } from 'module'; const require = createRequire(import.meta.url); globalThis.__filename = require('url').fileURLToPath(import.meta.url); globalThis.__dirname = require('path').dirname(globalThis.__filename);`
	},
	define: {
		'process.env.CLI_VERSION': JSON.stringify(pkg.version)
	},
	sourcemap: true,
	tsconfig: 'packages/cli/tsconfig.json',
	external: ['yoga-layout-prebuilt', 'yoga-layout-wasm', 'yoga-wasm-web'],
}).catch(() => process.exit(1))

// Copy yoga.wasm to the bundle directory
try {
	await fs.copyFile(
		path.join(__dirname, 'node_modules', 'yoga-layout-wasm', 'dist', 'yoga.wasm'),
		path.join(__dirname, 'bundle', 'yoga.wasm')
	);
} catch (error) {
	console.error('Error copying yoga.wasm:', error);
	process.exit(1);
}

// Copy cfonts fonts to the bundle directory
try {
	await fs.cp(
		path.join(__dirname, 'node_modules', 'cfonts', 'fonts'),
		path.join(__dirname, 'bundle', 'fonts'),
		{ recursive: true }
	);
} catch (error) {
	console.error('Error copying cfonts fonts:', error);
	process.exit(1);
}

// Copy slick.json to the bundle directory
try {
	await fs.copyFile(
		path.join(__dirname, 'node_modules', 'cfonts', 'fonts', 'slick.json'),
		path.join(__dirname, 'bundle', 'slick.json')
	);
} catch (error) {
	console.error('Error copying slick.json:', error);
	process.exit(1);
}
