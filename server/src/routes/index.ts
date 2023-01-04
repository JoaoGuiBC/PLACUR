import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { usersRouter } from "./users.routes.ts";
import { sessionsRouter } from "./sessions.routes.ts";
import { errorMiddleware } from "../lib/middlewares/errorMiddleware.ts";

const router = new Router();

router.use(errorMiddleware);

router.get("/test", ({ response }) => {
  return response.body = { connected: true };
});

router.use(["/users"], usersRouter.routes());
router.use(["/sessions"], sessionsRouter.routes());

export { router };
