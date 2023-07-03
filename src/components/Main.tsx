import Topbar from "./Topbar"
import Chat from "./Chat"

const Main: React.FC = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <Topbar />
      <Chat />
    </main>
  );
};

export default Main;
