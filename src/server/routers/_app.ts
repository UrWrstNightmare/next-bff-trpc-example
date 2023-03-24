import { z } from 'zod';
import axios from 'axios';
import { TRPCError } from '@trpc/server';
import { procedure, router } from '../trpc';

import searchHandler from "./search"
// const demoDataSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   description: z.string(),
//   published: z.boolean(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// })

// type SearchSchema = z.infer<typeof searchZodSchema>

export const appRouter = router({
  search: searchHandler,
  test: procedure
    .input(
      z.object({
        data: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return { payload: `hello, ${ input.data }` }
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;