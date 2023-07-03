import { Stage } from "@prisma/client";
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

  newStage: protectedProcedure
  .mutation(async ({ ctx }) => {
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

    // update the state
    // -> move to next stage
    // -> reset answer data
    await ctx.prisma.learningState.update({
      where: { id: state.id },
      data: {
        stage: getNextStage(state.stage),
        correctAnswers: 0,
        questionsAsked: 0,
        correctStreak: 0,
        incorrectStreak: 0,
      },
    });
  }),
});

export const getNextStage = (stage: Stage): Stage => {
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
