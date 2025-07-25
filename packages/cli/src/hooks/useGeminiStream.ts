import { GeminiClient } from "@simple-cli/core/index.js";
import { useState, useEffect, useCallback } from "react";
import { Message } from "./useHistory.js";

export default function useGeminiStream(
	geminiClient: GeminiClient,
	addItem: (event: Message) => void
) {
	const [isResponding, setIsResponding] = useState(false)
	const [currentMessage, setCurrentMessage] = useState<Message>()
	const [isStreaming, setIsStreaming] = useState(false);

	useEffect(() => {
		if (!isStreaming && currentMessage) {
			addItem(currentMessage)
			setCurrentMessage(undefined);
		}
	}, [currentMessage, addItem, isStreaming]);

	const submitQuery = useCallback(async (query: string) => {
		setIsResponding(true)
		setIsStreaming(true);

		const controller = new AbortController();
		try {
			const stream = geminiClient.sendMessageStream(query, controller)
			await processGeminiStream(stream, controller)
			setIsStreaming(false);
		} catch (e) {
			addItem({ type: "system", content: "An error occurred while processing your request." });
			console.log("ERR", e)
		} finally {
			setIsResponding(false);
		}
	}, [geminiClient, isResponding, setIsResponding])

	async function processGeminiStream(stream: AsyncGenerator<any, unknown>, _controller: AbortController) {
		for await (const event of stream) {
			setCurrentMessage((prev) => (
				{
					...prev,
					...event,
					content: (prev?.content || "") + " " + event.content
				} as Message
			));
		}
	}

	return {
		isStreaming,
		submitQuery,
		isResponding,
		currentMessage
	}
}
