import { useState } from "react";

export function uesHistory() {
	const [messages, setMessages] = useState<string[]>([])

	return {
		messages,
		setMessages
	}
}
