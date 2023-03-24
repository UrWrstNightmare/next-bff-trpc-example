import { z } from 'zod';
import axios from 'axios';
import { TRPCError } from '@trpc/server';
import { procedure, router } from '../trpc';

interface IDemoData {
  id: number,
  title: string,
  description: string,
  published: boolean,
  createdAt: Date,
  updatedAt: Date
}

const searchZodSchema = z.object({
  query: z.string(),
  maxcount: z.number()
             .min(1, "반환되는 아이템 숫자는 최소 1개여야 합니다!")
             .max(10, "반환되는 아이템 z숫자는 최대 10개까지 가능합니다!")
})

export default procedure
    .input(searchZodSchema)
    .query(async ({ input }) => {
      const res = await axios.get<IDemoData[]>("http://localhost:6868/api/tutorials/published")
      if (input.query === "") return res.data 
      else return res.data.filter((el) => el.description.includes(input.query))
    })