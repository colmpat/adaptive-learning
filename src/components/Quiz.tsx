import { api } from "~/utils/api";

import Question from "~/components/Question";
import useIterator from "~/hooks/useIterator";
import StageSummary from "./StageSummary";

const Quiz: React.FC = () => {
  const { data: questions, refetch: refetchQuestions } = api.question.getAllForCurrentStage.useQuery();
  const { mutateAsync: updateLearningStage } = api.learningState.newStage.useMutation();
  const { val: currentQuestion, next: nextQuestion } = useIterator(questions);

  const nextStage = () => {
    void updateLearningStage().then(() => {
      void refetchQuestions();
    });
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
