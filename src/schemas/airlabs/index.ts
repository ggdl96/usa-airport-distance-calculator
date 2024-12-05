import { z } from "zod";

export const AirlabsItemResponseSchema = z.object({
  name: z.string(),
  iata_code: z.nullable(z.string()),
  icao_code: z.nullable(z.string()),
  lat: z.number(),
  lng: z.number(),
  country_code: z.string(),
});

export const AirlabsResponseSchema = z.object({
  request: z.object({
    lang: z.string(),
    currency: z.string(),
    time: z.number(),
    id: z.string(),
    server: z.string(),
    host: z.string(),
    pid: z.number(),
    key: z.object({
      id: z.number(),
      api_key: z.string(),
      type: z.string(),
      expired: z.string().datetime(),
      registered: z.string().datetime(),
      upgraded: z.nullable(z.string()),
      limits_by_hour: z.number(),
      limits_by_minute: z.number(),
      limits_by_month: z.number(),
      limits_total: z.number(),
    }),
    params: z.object({
      country_code: z.string(),
      lang: z.string(),
    }),
    version: z.number(),
    method: z.string(),
    client: z.object({
      ip: z.string(),
      geo: z.object({
        country_code: z.string(),
        country: z.string(),
        continent: z.string(),
        city: z.string(),
        lat: z.number(),
        lng: z.number(),
        timezone: z.string(),
      }),
      connection: z.object({}),
      device: z.object({}),
      agent: z.object({}),
      karma: z.object({
        is_blocked: z.boolean(),
        is_crawler: z.boolean(),
        is_bot: z.boolean(),
        is_friend: z.boolean(),
        is_regular: z.boolean(),
      }),
    }),
  }),
  response: z.array(AirlabsItemResponseSchema),
  terms: z.string(),
});
