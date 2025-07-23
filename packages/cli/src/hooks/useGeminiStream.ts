import { GeminiClient } from "@simple-cli/core/index.js";
import { useState, useCallback } from "react";
import { Message } from "./useHistory.js";

export default function useGeminiStream(
	geminiClient: GeminiClient,
	// setMessages: React.Dispatch<SetStateAction<Message[]>>,
	addItem: (event: Message) => void
) {
	const [isResponding, setIsResponding] = useState(false)
	// const [currentMessage, setCurrentMessage] = useState<Message[]>([])

	const submitQuery = useCallback(async (query: string) => {
		setIsResponding(true)

		const controller = new AbortController();
		try {
			const stream = geminiClient.sendMessageStream(query, controller)
			await processGeminiStream(stream, controller)
			// console.log("about to set messages", currentMessage)
			// if (currentMessage.length > 0) {
			// 	setMessages((prev: Message[]) => [...prev, ...currentMessage])
			// }
			// setCurrentMessage([]);
		} catch (e) {
			console.log("ERR", e)
		} finally {
			setIsResponding(false);
		}
	}, [geminiClient, isResponding, setIsResponding])

	async function processGeminiStream(stream: AsyncGenerator<any, unknown>, _controller: AbortController) {
		for await (const event of stream) {
			addItem(event as Message);
		}
		return true;
	}

	return {
		submitQuery,
		isResponding,
		// currentMessage
	}
}
