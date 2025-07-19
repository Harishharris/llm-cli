import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
	apiKey: 
});

async function GeminiClient() {
	const stream = await ai.models.generateContentStream({
		model: 'gemini-2.5-flash',
		contents: [{
			"role": "user", parts: [{ text: "What is the CEO of Microsoft? give me a couple of lines about him" }]
		}],
		config: {
			thinkingConfig: {
				thinkingBudget: 0,
			}
		}
	})
	return stream
}

async function* handleStream(stream) {
	for await (const chunk of stream) {
		const text = chunk.candidates[0].content.parts[0].text;
		console.log("chunk is\n", text);
		yield text;
	}
}

async function main() {
	const geminiStream = await GeminiClient()
	console.log(geminiStream)
	const stream = handleStream(geminiStream);
	let out = '';
	for await (const chunk of stream) {
		out += chunk;
	}
	console.log('full output\n', out);
}

main().catch(console.error);
