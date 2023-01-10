import { Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";

import { key } from "../keys/jwtKey.ts";
import { AppError } from "../appError.ts";
import { errorMiddleware } from "./errorMiddleware.ts";
import { renewUserSession } from "../../services/sessions/renewUserSession.ts";

export const ensureAuthenticatedMiddleware: Middleware = async (ctx, next) => {
  const jwt = await ctx.cookies.get("token");

  if (jwt) {
    const result = await verify(jwt, key);

    if (!result) {
      throw new AppError("Usuário não autenticado", 401);
    }

    const { token } = await renewUserSession(String(result.sub));

    ctx.response.headers.set("jwt", token);

    next();
  } else {
    throw new AppError("Usuário não autenticado", 401);
  }

  await errorMiddleware(ctx, next);
};
