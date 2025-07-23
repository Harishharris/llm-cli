import { useState } from "react";

export interface Message {
	type: 'user' | 'gemini';
	content: string;
}

export function uesHistory() {
	const [messages, setMessages] = useState<Message[]>([])

	function addItem(event: Message) {
		setMessages((prev: Message[]) => [...prev, event as Message])
	}

	return {
		messages,
		addItem,
		setMessages
	}
}
