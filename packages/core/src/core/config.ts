import { GeminiClient } from './client.js';
import { getContentGeneratorConfig } from './contentGenerator.js';

interface Params {
	model: string;
}

export class Config {
	private geminiClient?: GeminiClient;
	private model: string;

	constructor(params: Params) {
		this.model = params.model;
	}

	async refreshAuth() {
		const contentGeneratorConfig = getContentGeneratorConfig();
		const gc = new GeminiClient(this);
		this.geminiClient = gc;
		gc.initialize(contentGeneratorConfig)
	}

	getGeminiClient() {
		return this.geminiClient;
	}

	getModel() {
		return this.model
	}
}
