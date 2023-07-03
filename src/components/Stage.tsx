import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import { useState } from "react";

const Stage: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: learningStateData, refetch } = api.learningState.getSessionState.useQuery(
    undefined,
    { 
      enabled: sessionData?.user !== undefined,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );
  const { mutateAsync } = api.learningState.newStage.useMutation();

  const [loading, setLoading] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center text-2xl text-white">
        Current stage: {learningStateData?.stage}
      </p>
      <button
        className="px-4 py-2 mt-4 text-white bg-gray-600 rounded hover:bg-gray-500"
        onClick={async () => {
          setLoading(true)
          await mutateAsync()
          setLoading(false)
          refetch()
        }}
      >
      {loading ? "loading..." : "Next stage"}
      </button>
    </div>
  );
};

export default Stage;
