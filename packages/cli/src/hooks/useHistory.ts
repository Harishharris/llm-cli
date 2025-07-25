import { useState, useCallback } from "react";

export interface Message {
	type: 'user' | 'gemini' | 'system';
	content: string;
}

export function useHistory() {
	const [messages, setMessages] = useState<Message[]>([])

	const addItem = useCallback((event: Message) => {
		setMessages((prev: Message[]) => [...prev, { ...event }])
	}, [setMessages]);

	return {
		messages,
		addItem,
		setMessages
	}
}
