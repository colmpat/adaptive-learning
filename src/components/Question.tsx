import { useState } from "react";
import { Question } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";

const Question: React.FC<{
  question: Question
  nextQuestion: () => void
}> = ({ question, nextQuestion }) => {
  const [choice, setChoice] = useState<number | null>(null);
  const { data: state } = api.learningState.getSessionState.useQuery();
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
      <h2 className="mb-8 text-2xl font-bold text-fgDefault">{titleCase(state?.stage)}</h2>
      <h1 className="text-xl font-semibold text-fgDefault">
        {question.question}
      </h1>
      <div className="flex flex-wrap justify-center">
        {question.images.map((image, i) => (
          <Image
            key={i}
            width={200}
            height={200}
            src={image}
            alt={question.question}
          />
        ))}
      </div>


      <ul className="min-w-[80px]">
        {question.answers.map((answer, i) => {
          let color = "";
          if(choice !== null) {
            if(i === question.correctAnswer) {
              color = " bg-green-300";
            } else if(i === choice) {
              color = " bg-red-300";
            }
          }

          return (
            <li key={i}>
              <button 
                className={
                  "w-full border border-transparent hover:border-borderDefault rounded-xl p-3 text-fgMuted mt-4" + color
                  }
                onClick={handleChoice.bind(null, i)}
              >
                {answer}
              </button>
            </li>
          );
        })}
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

function titleCase(str: string | undefined) {
  if(!str || str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default Question;
