import { GeminiClient } from "@simple-cli/core/index.js";
import { useState, SetStateAction, useCallback } from "react";

export default function useGeminiStream(
	geminiClient: GeminiClient,
	setMessages: React.Dispatch<SetStateAction<string[]>>
) {
	const [isResponding, setIsResponding] = useState(false)

	const submitQuery = useCallback(async (query: string) => {
		setIsResponding(true)

		const controller = new AbortController();
		try {
			const stream = geminiClient.sendMessageStream(query, controller)
			const response = await processGeminiStream(stream, controller)
			console.log("RESPONSE", response)
		} catch (e) {
			console.log("ERR", e)
		} finally {
			setIsResponding(false);
		}
	}, [geminiClient, isResponding, setIsResponding])

	async function processGeminiStream(stream: AsyncGenerator<any, unknown>, _controller: AbortController) {
		// if (controller.signal.aborted) {
		// 	return false;
		// }
		for await (const event of stream) {
			console.log("IS IT HERE", event)
			setMessages((prev: any) => [...prev, JSON.stringify(event.candidates[0].content.parts[0].text)])
		}
		return true;
	}

	return {
		submitQuery,
		isResponding
	}
}
