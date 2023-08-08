import Topbar from "./Topbar"
import Chat from "./Chat"
import Quiz from "./Quiz"
import { useState } from "react";

const Main: React.FC = () => {
  const [chat, setChat] = useState<boolean>(false);

  return (
    <main className="w-screen min-h-screen flex flex-col">
      <Topbar chat={chat} setChat={setChat} />
      { chat ? <Chat setChat={setChat} /> : <Quiz setChat={setChat} /> }
    </main>
  );
};

export default Main;
