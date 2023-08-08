import { LearningState, Stage } from "@prisma/client";

export const Prompts: { [key in Stage]: string[] } = {
  [Stage.REMEMBER]: ["Remember_1", "Remember_2", "Remember_3"],
  [Stage.UNDERSTAND]: ["Understand_1", "Understand_2", "Understand_3"],
  [Stage.APPLY]: [],
  [Stage.ANALYZE]: [],
  [Stage.EVALUATE]: [],
  [Stage.CREATE]: [],
  [Stage.DONE]: [],
}

export const generatePrompt = (state: LearningState): string | undefined => {
  const prompts = Prompts[state.stage];
  if(state.stageAttempts >= prompts.length) return undefined;

  return prompts[state.stageAttempts];
}
