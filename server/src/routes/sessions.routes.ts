import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { startUserSession } from "../services/sessions/startUserSession.ts";

const sessionsRouter = new Router();

export interface ICreateSession {
  email: string;
  password: string;
}

sessionsRouter.post("/", async ({ request, response }) => {
  const body = request.body();
  const userCredentials = await body.value as ICreateSession;

  const session = await startUserSession(userCredentials);

  return response.body = session;
});

export { sessionsRouter };
