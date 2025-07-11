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

	async *sendMessageStreams(request: string, signal: AbortController) {
		const stream = this.contentGenerator.generateContentStream({
			model: this.model,
			contents: request,
		})
		for await (const chunk of stream) {
			if (signal.signal.aborted) {
				return;
			}
			yield chunk;
		}
	}

	getContentGeneratorConfig() {
		if (!this.contentGeneratorConfig) {
			throw new Error('Content generator config is not initialized');
		}
		return this.contentGeneratorConfig;
	}
}
