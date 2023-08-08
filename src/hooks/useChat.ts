import { useState, useCallback } from "react";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
}

const useChat = (): [Message[], (msg: Message) => void] => {
  // maintain a list of messages
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback(async (msg: Message) => {
    // add the message to the list
    setMessages((messages) => [...messages, msg]);

    if(msg.role === "user") {
      const response = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const answer = await response.json();
      console.log(answer);
      setMessages((messages) => [...messages, answer]);
    }
  }, []);

  return [messages, addMessage];
}

export default useChat;
