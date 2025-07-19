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
		console.log("DID I GET REQUEST", request)
		try {
			const stream = await this.contentGenerator.generateContentStream({
				model: this.model,
				contents: [{ role: "user", parts: [{ text: 'who is the ceo of microsoft' + request }] }],
				config: {
					thinkingConfig: {
						thinkingBudget: 0,
					}
				}
			})
			console.log("WHAT IS IT HERE", stream)
			for await (const event of stream) {
				yield event
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
