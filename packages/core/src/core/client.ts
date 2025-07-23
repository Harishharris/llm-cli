import { Config } from './config.js';
import { getContentGenerator } from './contentGenerator.js';
import { ContentGeneratorConfig } from './contentGenerator.js';

export class GeminiClient {
	private contentGeneratorConfig?: ContentGeneratorConfig;
	private contentGenerator: any;
	private model: string;

	constructor(config: Config) {
		this.model = config.getModel();
	}

	async initialize(config: ContentGeneratorConfig) {
		this.contentGeneratorConfig = config;
		this.contentGenerator = getContentGenerator(config);
	}

	async *sendMessageStream(request: string, _signal: AbortController) {
		try {
			const stream = await this.contentGenerator.generateContentStream({
				model: this.model,
				contents: [{ role: "user", parts: [{ text: request }] }],
				config: {
					thinkingConfig: {
						thinkingBudget: 0,
					}
				}
			})
			for await (const event of stream) {
				const content = getContent(event)
				yield {
					type: "gemini",
					content,
				}
			}
			return stream;
		} catch (err) {
			console.log("IN ERROR", err)
			return err;
		}
	}

	getContentGeneratorConfig() {
		if (!this.contentGeneratorConfig) {
			throw new Error('Content generator config is not initialized');
		}
		return this.contentGeneratorConfig;
	}
}

function getContent(event: any) {
	const parts = event.candidates?.[0]?.content?.parts;
	if (!parts) {
		return '';
	}
	const text = parts.map((part: any) => (part.text as string).trim().replace('"', ''))
	if (text.length === 0) {
		return '';
	}
	return text.join('');
}
