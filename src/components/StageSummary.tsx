import { api } from "~/utils/api";

const StageSummary: React.FC<{ nextStage: () => void }> = ({ nextStage }) => {
  const { data: learningState } = api.learningState.getSessionState.useQuery();

  return (
    <div className="max-w-[800px] p-10 rounded-lg bg-white shadow-lg flex flex-col items-center">
      <h1 className="text-xl font-bold text-fgDefault">
        Stage Summary
      </h1>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-fgMuted text-lg font-bold">
          {learningState?.stage}
        </h2>
        <h2 className="text-fgDefault text-lg font-bold ml-2">
          You got <span className="p-2 bg-blue-200 rounded-lg">{learningState?.correctAnswers}/{learningState?.questionsAsked}</span> correct
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextStage}
        >
          Proceed to next stage
        </button>
      </div>
    </div>
  );
};

export default StageSummary;
