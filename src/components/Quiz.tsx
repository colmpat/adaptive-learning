import { api } from "~/utils/api";

import Question from "~/components/Question";
import useIterator from "~/hooks/useIterator";
import StageSummary from "./StageSummary";
import { SetStateAction } from "react";

const Quiz: React.FC<{ setChat: React.Dispatch<SetStateAction<boolean>> }>= ({ setChat }) => {
  const { data: questions, refetch: refetchQuestions } = api.question.getAllForCurrentStage.useQuery();
  const { mutateAsync: updateLearningStage } = api.learningState.nextStage.useMutation();
  const { val: currentQuestion, next: nextQuestion, resetIter } = useIterator(questions);


  const nextStage = async () => {
    const proceeding = await updateLearningStage()
    if(!proceeding) {
      setChat(true);
    }

    await refetchQuestions();
    resetIter();
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center bg-canvas">
      {currentQuestion ? (
        <Question question={currentQuestion} nextQuestion={nextQuestion} />
      ) : (
        <StageSummary nextStage={nextStage} />
      )}
    </div>
  );
};

export default Quiz;
