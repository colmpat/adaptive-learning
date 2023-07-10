import { z } from "zod";
import { Stage } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),

  markAsSeen: protectedProcedure.input(z.object({
    id: z.string(),
  })).mutation(async ({ ctx, input }) => {
    await ctx.prisma.question.update({
      where: { id: input.id },
      data: {
        questionShown: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),

  getFirstUnseen: protectedProcedure.query(async ({ ctx }) => {
    let sessionLearningState = await ctx.prisma.learningState.findFirst({
      where: { userId: ctx.session.user.id },
    });

    // get first question in the current stage that the user has not seen
    const unseen = await ctx.prisma.question.findFirst({
      where: {
        stage: {
          equals: sessionLearningState!.stage,  // we know this exists because of the protectedProcedure decorator
        },
        questionShown: {
          none: {
            id: {
              equals: ctx.session.user.id,
            },
          },
        },
      },
    })

    return unseen;
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