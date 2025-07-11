import { GoogleGenAI } from '@google/genai';

export interface ContentGeneratorConfig {
	model: string;
	apiKey?: string;
}

export function getContentGenerator(config: ContentGeneratorConfig) {
	const client = new GoogleGenAI({
		apiKey: config.apiKey === '' ? undefined : config.apiKey,
	})
	return client.models;
}

export function getContentGeneratorConfig() {
	const GEMINI_API_KEY = process.env["GEMINI_API_KEY"];
	if (!GEMINI_API_KEY) {
		throw new Error("GEMINI_API_KEY is not set");
	}

	const contentGeneratorConfig = {
		model: 'gemini-2.5 pro',
		apiKey: GEMINI_API_KEY,
	}

	return contentGeneratorConfig;
}
