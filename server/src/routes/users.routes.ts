import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { ensureAuthenticatedMiddleware } from "../lib/middlewares/index.tsx";
import {
  createUser,
  deleteUser,
  findUser,
  updateUser,
} from "../services/users/index.ts";

const usersRouter = new Router();

interface IUserData {
  email: string;
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
  hasPhysicalDisability: boolean;
  isAdmin: boolean;
}
export interface ICreateUser extends IUserData {
  password: string;
}
export interface IUpdateUser extends IUserData {
  id: string;
}

usersRouter.get(
  "/find",
  ensureAuthenticatedMiddleware,
  async ({ request, response }) => {
    const userId = String(request.url.searchParams.get("userId"));

    const user = await findUser(userId);

    return response.body = user;
  },
);

usersRouter.post("/create", async ({ request, response }) => {
  const body = request.body();
  const userData = await body.value as ICreateUser;

  const { user } = await createUser(userData);

  return response.body = user;
});

usersRouter.put(
  "/update",
  ensureAuthenticatedMiddleware,
  async ({ request, response }) => {
    const body = request.body();
    const userData = await body.value as IUpdateUser;

    const { user } = await updateUser(userData);

    return response.body = user;
  },
);

usersRouter.delete(
  "/delete",
  ensureAuthenticatedMiddleware,
  async ({ request, response }) => {
    const userId = String(request.url.searchParams.get("userId"));

    await deleteUser(userId);

    return response.body = { message: "Usuário deletado com sucesso" };
  },
);

export { usersRouter };
