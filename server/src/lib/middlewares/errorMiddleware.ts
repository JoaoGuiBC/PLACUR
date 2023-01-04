import { Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { AppError } from "../appError.ts";

export const errorMiddleware: Middleware = async (context, next) => {
  console.log("asd");
  try {
    await next();
  } catch (err) {
    if (err instanceof AppError) {
      context.response.status = err.statusCode;
    } else {
      context.response.status = 500;
    }
    context.response.body = { error: err.message };
    context.response.type = "json";
  }
};
