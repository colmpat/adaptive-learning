import { LearningState } from "@prisma/client";
import { SetStateAction, useEffect, useState } from "react";
import useChat, { Message } from "~/hooks/useChat";
import { generatePrompt } from "~/resources/prompts";
import { api } from "~/utils/api";

const Chat: React.FC<{ setChat: React.Dispatch<SetStateAction<boolean>> }> = ({ setChat }) => {
  const { data: state } = api.learningState.getSessionState.useQuery();
  const [prompt, setPrompt] = useState<string>("");
  const [messages, addMessage] = useChat();
  const [hydrated, setHydrated] = useState<boolean>(false);

  /**
   * hydratePrompt hydrates the prompt based on the current learning state to provide the user with feedback based
   * on their previous stage.
   *
   * @param state The current learning state
   */
  const hydratePrompt = (state: LearningState | undefined) => {
    if(!state) return;
    const hydratedPrompt = generatePrompt(state);
    if (!hydratedPrompt) return;

    setHydrated(true);
    const message: Message = { role: "system", content: hydratedPrompt };
    addMessage(message);
  }

  // Hydrate the prompt on initial load
  useEffect(() => {
    if(!hydrated && state) {
      hydratePrompt(state);
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!prompt) return;

    addMessage({ role: "user", content: prompt });
    setPrompt("");
  };
    

return (
  <div className="w-full h-main h-fit flex flex-col items-center bg-canvas">
    <div className="h-full w-[800px] flex-grow overflow-y-scroll px-4 pt-8 pb-20 mb-10">
      <div className="flex flex-col gap-4">
        {messages.map((message, i) => {
          const className = message.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start";
          return (
            <div className={`rounded-lg shadow-lg px-4 py-3 ${className}`} key={i}>
              {message.content}
            </div>
          );
        })}
      </div>
    </div>
    <div className="flex gap-4 w-[800px] my-8 fixed bottom-0">
      <form className="flex-grow bg-white rounded-lg shadow p-4" onSubmit={handleSubmit}>
        <input
          className="w-full h-full outline-none"
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </form>
      <button
        className="bg-blue-500 text-white font-semibold rounded-lg p-4"
        onClick={() => setChat(false)}
      >
        Proceed to Quiz
      </button>
    </div>
  </div>
);
};

export default Chat;
