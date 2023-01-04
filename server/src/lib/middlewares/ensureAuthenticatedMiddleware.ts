import { Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";

import { errorMiddleware } from "./errorMiddleware.ts";
import { key } from "../keys/jwtKey.ts";
import { AppError } from "../appError.ts";

export const ensureAuthenticatedMiddleware: Middleware = async (ctx, next) => {
  const jwt = await ctx.cookies.get("token");

  if (jwt) {
    const result = await verify(jwt, key);

    if (!result) {
      throw new AppError("Usuário não autenticado", 401);
    }

    next();
  } else {
    throw new AppError("Usuário não autenticado", 401);
  }

  await errorMiddleware(ctx, next);
};
