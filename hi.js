import { GoogleGenAI, FunctionCallingConfigMode, Type } from "@google/genai";
import "dotenv/config"; // Assuming you have a .env file with API_KEY

// 1. Correctly define the tool declaration.
//    The 'description' is crucial for the model to understand when to use the tool.
const readFileToolDeclaration = {
	name: "read_file",
	description: "Reads the contents of a file from the specified absolute path and returns its content.",
	parameters: {
		type: Type.OBJECT, // Use Type.OBJECT from @google/genai
		properties: {
			path: {
				type: Type.STRING, // Use Type.STRING from @google/genai
				description: "The absolute path of the file to read.",
			},
		},
		required: ["path"],
	},
};

// Wrap it in the expected 'tools' array structure.
// This 'tools' array will be passed directly in the generateContentStream request.
const tools = [
	{
		functionDeclarations: [readFileToolDeclaration],
	},
];

async function GeminiClient() {
	// Initialize GoogleGenAI correctly.
	// Ensure your API_KEY is loaded from .env or provided directly.
	const ai = new GoogleGenAI({ apiKey: 'AIzaSyDSUrhHPtL_6vVql2rKznHpP6vtq6Jv5Lw' });

	// Your prompt, slightly rephrased for clarity and to strongly imply tool use.
	const prompt = `Please read the contents of the file located at \`C:\\Users\\Harish\\Desktop\\hi.js\` and then explain what's
  in it. You have a tool called \`read_file\` that can read file contents, which takes the absolute file path as a parameter. You
  do not need to ask for permission to use this tool.`;

	console.log(`Sending prompt: "${prompt}"`);

	// Make the generateContentStream call directly on ai.models.
	// Crucially, pass 'tools' and 'toolConfig' in the request object.
	const stream = await ai.models.generateContentStream({
		model: 'gemini-2.5-flash', // Or 'gemini-1.5-flash' for faster responses
		contents: [{ role: "user", parts: [{ text: prompt }] }],
		config: {
			thinkingConfig: {
				thinkingBudget: 0, // Keep this if you don't want thoughts
			},
		},
		// CORRECT: Pass the 'tools' array here for tool declaration
		tools: tools,
		// CORRECT: Add toolConfig to explicitly enable function calling
		toolConfig: {
			functionCallingConfig: {
				mode: FunctionCallingConfigMode.ANY, // Force tool calling for debugging
				// If you have multiple tools and want to restrict, you can use:
				// allowedFunctionNames: ["read_file"],
			},
		},
		// REMOVED: The incorrect 'toolCalls' parameter from here.
		// 'toolCalls' is for sending tool *results* back to the model.
	});

	return stream;
}

async function main() {
	const geminiStream = await GeminiClient();
	let accumulatedText = '';

	console.log("--- Model Response Stream ---");
	// Loop directly over the 'stream' property of the result.
	// Each 'chunk' here is a GenerateContentResponse object, which has the .functionCalls getter.
	for await (const chunk of geminiStream.stream) {
		// Log the raw chunk to see its full structure. This is your best friend for debugging.
		console.log("RAW CHUNK:", JSON.stringify(chunk, null, 2));

		// Access text and functionCalls as PROPERTIES of the GenerateContentResponse chunk.
		// NOT as methods (e.g., chunk.text() is incorrect).
		const textPart = chunk.text;
		if (textPart) {
			console.log("Text Part:", textPart);
			accumulatedText += textPart;
		}

		const functionCalls = chunk.functionCalls;
		if (functionCalls && functionCalls.length > 0) {
			console.log("\n✅ Function Call Found!");
			console.log(JSON.stringify(functionCalls, null, 2));
			// At this point, you would typically execute the tool (e.g., read the file)
			// and then send the tool's result back to the model in the next turn.
			// For now, we'll just log and stop.
			break; // Stop after the first function call for debugging
		}
	}
	console.log("--- End of Stream ---");

	console.log('\nFull aggregated text output (if no tool call was made or stream completed):');
	console.log(accumulatedText);
}

main().catch(console.error);

