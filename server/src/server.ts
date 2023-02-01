import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { router } from "./routes/index.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening on port 3333");

app.listen({ port: 3333 });
