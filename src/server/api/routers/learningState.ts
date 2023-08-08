import { z } from "zod";
import { LearningState, Stage } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const learningStateRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSessionState: protectedProcedure.query(async ({ ctx }) => {
    // get the associated learning state
    let state = await ctx.prisma.learningState.findFirst({
      where: { userId: ctx.session.user.id },
    });

    // if there is no state, create one
    if(!state) {
      state = await ctx.prisma.learningState.create({
        data: {
          userId: ctx.session.user.id,
        },
      });
    }

    return state;
  }),

  answerQuestion: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        correct: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // get the associated learning state
      const state = await ctx.prisma.learningState.findFirst({
        where: { userId: ctx.session.user.id },
      });
      if(!state) {
        return 
      }

      // update the state
      // -> increment questions asked
      // -> if correct, increment correct answers and correct streak
      await ctx.prisma.learningState.update({
        where: { id: state.id },
        data: {
          questionsAsked: state.questionsAsked + 1,
          correctAnswers: state.correctAnswers + (input.correct ? 1 : 0),
          correctStreak: input.correct ? state.correctStreak + 1 : 0,
          incorrectStreak: input.correct ? 0 : state.incorrectStreak + 1,
        },
      });
    }),

    nextStage: protectedProcedure.mutation(async ({ ctx }) => {
      // get the associated learning state
      let state = await ctx.prisma.learningState.findFirst({
        where: { userId: ctx.session.user.id },
      });

      // if there is no state, create one
      if(!state) {
        state = await ctx.prisma.learningState.create({
          data: {
            userId: ctx.session.user.id,
          },
        });
      }

      const data: Partial<LearningState> = {
        correctAnswers: 0,
        questionsAsked: 0,
        correctStreak: 0,
        incorrectStreak: 0,
      }

      const proceeding = proceedingToNextStage(state);

      if(proceeding) {
        data.stage = getNextStage(state.stage);
        data.stageAttempts = 0;
      } else {
        data.stageAttempts = state.stageAttempts + 1;
      }

      // update the state
      // -> move to next stage
      // -> reset answer data
      await ctx.prisma.learningState.update({
        where: { id: state.id },
        data: data,
      });

      return proceeding;
    }),
});

const getNextStage = (stage: Stage): Stage => {
    switch(stage) {
      case Stage.REMEMBER:
        return Stage.UNDERSTAND;
      case Stage.UNDERSTAND:
        return Stage.APPLY;
      case Stage.APPLY:
        return Stage.ANALYZE;
      case Stage.ANALYZE:
        return Stage.EVALUATE;
      case Stage.EVALUATE:
        return Stage.CREATE;
      default: // ie. CREATE -> DONE or DONE -> DONE
        return Stage.DONE;
    }
}

/**
 * Returns true if the user can proceed to the next stage. At this point, we are simply checking that they have
 * answered 4/5 questions correctly.
 *
 * @param state - the current learning state
 * @returns true if the user can proceed to the next stage
 */
const proceedingToNextStage = (state: LearningState): boolean => {
  return state.correctAnswers / state.questionsAsked >= 0.8;
}
