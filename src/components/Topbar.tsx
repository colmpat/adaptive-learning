import type { Dispatch, SetStateAction } from "react";

const Topbar: React.FC<{ 
  chat: boolean,
  setChat: Dispatch<SetStateAction<boolean>>
}> = ({ chat, setChat }) => {
  const handleMenuClick = () => {
    // Add your logic here for handling menu click
    setChat(!chat);
  };

  const handleProfileClick = () => {
    // Add your logic here for handling profile click
  };

  const handleSettingsClick = () => {
    // Add your logic here for handling settings click
  };

  return (
    <div className="w-screen h-16 bg-canvas flex items-center justify-between px-4 border-b border-borderDefault">
      <div className="flex items-center">
        <button
          className="text-gray-800 hover:text-gray-600 focus:outline-none mr-4 p-1 rounded-md border border-fgPrimary"
          onClick={handleMenuClick}
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            />
          </svg>
        </button>
        <h1 className="text-md font-semibold">Adaptive Learning</h1>
      </div>
      <div>
        <button
          className="w-9 h-9 mr-4 p-1 text-xl rounded-md border border-fgPrimary"
          onClick={handleProfileClick}
        >
        👤
        </button>
        <button
          className="w-9 h-9 p-1 text-xl rounded-md border border-fgPrimary"
          onClick={handleSettingsClick}
        >
        ⚙︎
        </button>
      </div>
    </div>
  );
};

export default Topbar;
