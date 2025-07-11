import * as dotenv from "dotenv";
import * as fs from "fs";
import { Config } from '@simple-cli/core'

function findEnvFile() {
	const currentPath = process.cwd();
	const envFilePath = `${currentPath}/.env`;
	if (fs.existsSync(envFilePath)) {
		return envFilePath;
	}
	console.warn("No .env file found in the current directory.");
	return null;
}

function loadEnv() {
	const envFilePath = findEnvFile();
	if (envFilePath) {
		dotenv.config({ path: envFilePath, quiet: true });
	}
}

export function main() {
	loadEnv();
	return new Config({
		model: 'gemini-2.5-flash',
	})
}
