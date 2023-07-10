import { api } from "~/utils/api";
import { useState } from "react";
import { Question } from "@prisma/client";

import useIterator from "~/hooks/useIterator";

const Quiz: React.FC = () => {
  const { data: questions } = api.question.getAll.useQuery();
  const [currentQuestion, nextQuestion] = useIterator(questions);

  if(!currentQuestion) {
    return <div>Oh no, no questions found!</div>
  }

  return (
    <div className="flex flex-col flex-grow items-center justify-center bg-canvas">
      <Question question={currentQuestion} nextQuestion={nextQuestion} />
    </div>
  );
};

const Question: React.FC<{
  question: Question
  nextQuestion: () => void
}> = ({ question, nextQuestion }) => {
  const [choice, setChoice] = useState<number | null>(null);

  return (
    <div className="max-w-[800px] p-10 rounded-lg bg-white shadow-lg flex flex-col items-center">
      <h1 className="text-xl font-bold text-fgDefault">
        {question.question}
      </h1>
      <ul>
        {question.answers.map((answer, i) => (
          <li key={i}>
            <button 
              className={
                "w-full border border-transparent hover:border-borderDefault rounded-xl p-3 text-fgMuted mt-4" + (
                  (choice && i === question.correctAnswer) ? " bg-green-200" : i === choice ? " bg-red-200" : ""
                )}
              onClick={() => choice === null && setChoice(i)}
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

export default Quiz;
