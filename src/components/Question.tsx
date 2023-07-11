import { useState } from "react";
import { Question } from "@prisma/client";
import { api } from "~/utils/api";

const Question: React.FC<{
  question: Question
  nextQuestion: () => void
}> = ({ question, nextQuestion }) => {
  const [choice, setChoice] = useState<number | null>(null);
  const { mutate } = api.learningState.answerQuestion.useMutation();

  const handleChoice = (i: number) => {
    setChoice(i);
    mutate({
      questionId: question.id,
      correct: i === question.correctAnswer,
    });
  }

  return (
    <div className="max-w-[800px] p-10 rounded-lg bg-white shadow-lg flex flex-col items-center">
      <h1 className="text-xl font-bold text-fgDefault">
        {question.question}
      </h1>
      <ul className="min-w-[80px]">
        {question.answers.map((answer, i) => (
          <li key={i}>
            <button 
              className={
                "w-full border border-transparent hover:border-borderDefault rounded-xl p-3 text-fgMuted mt-4" + (
                  (choice && i === question.correctAnswer) ? " bg-green-200" : i === choice ? " bg-red-200" : ""
                )}
              onClick={handleChoice.bind(null, i)}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
      {choice !== null && (
        <button
          className="text-white font-bold border hover:bg-fgMuted rounded-xl p-3 text-fgMuted mt-4 bg-fgSubtle"
          onClick={() => {
            nextQuestion();
            setChoice(null);
          }}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Question;
