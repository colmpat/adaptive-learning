import { useState } from "react";
import Stage from "./Stage";

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");

  return (
    <div className="w-full h-full flex flex-col items-center justify-end bg-canvas">
      <div className="w-[800px]">
        <Stage />
        <div className="w-full h-50 bg-white rounded-lg shadow-xl p-4 mb-10">
          <input
            className="w-full h-full outline-none"
            type="text"
            placeholder="Type your message here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default Chat;
