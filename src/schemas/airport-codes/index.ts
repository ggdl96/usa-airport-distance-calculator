import { z } from "zod";

export const AutoCompleteResponseSchema = z.object({
    airports: z.array(
      z.object({
        name: z.string(),
        city: z.string(),
        iata: z.string(),
        country: z.object({
          name: z.string(),
          iso: z.string(),
        }),
        state: z.object({
          name: z.string(),
          abbr: z.nullable(z.string()),
        }),
      })
    ),
    term: z.string(),
    limit: z.string(),
    size: z.number(),
    cached: z.boolean(),
    status: z.boolean(),
    statusCode: z.number(),
});
