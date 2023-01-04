import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { findUser } from "../services/users/findUser.ts";
import { createUser } from "../services/users/createUser.ts";
import { ensureAuthenticatedMiddleware } from "../lib/middlewares/index.tsx";

const usersRouter = new Router();

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  document: string;
  phone: string;
  isPublicAgent: boolean;
  office?: string;
  address: string;
  neighborhood: string;
  city: string;
  haveVisualImpairment: boolean;
  haveHearingImpairment: boolean;
  isAdmin: boolean;
}

usersRouter.get(
  "/",
  ensureAuthenticatedMiddleware,
  async ({ request, response }) => {
    const userId = String(request.url.searchParams.get("userId"));

    const user = await findUser(userId);

    return response.body = user;
  },
);

usersRouter.post("/", async ({ request, response }) => {
  const body = request.body();
  const userData = await body.value as ICreateUser;

  const { user } = await createUser(userData);

  return response.body = user;
});

export { usersRouter };
