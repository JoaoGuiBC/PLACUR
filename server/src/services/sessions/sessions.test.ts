import { assertRejects, assertExists, assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts"

import { AppError } from "../../lib/appError.ts"
import { createUser } from "../users/createUser.ts"
import { startUserSession } from "./startUserSession.ts"

Deno.test("Sessions services", async (test) => {
  const newUser = {
    id: "fakeSessionId",
    email: "session@example.com",
    password: "password123",
    name: "John Doe",
    document: "123.123.123-12",
    phone: "99 99999-9999",
    isPublicAgent: false,
    address: "Fake street, 123",
    neighborhood: "Fake neighborhood",
    city: "Fake city",
    haveVisualImpairment: false,
    haveHearingImpairment: false,
    isAdmin: false
  }

  await test.step("Session start", async (testStep) => {
    await testStep.step("It should start a new session", async () => {
      await createUser(newUser)

      const { token, user } = await startUserSession({
        email: "session@example.com",
        password: "password123"
      })

      assertExists(user)
      assertExists(token)
      assertEquals(user.email, "session@example.com")
    })

    await testStep.step("It should not start a new session if user does not exist", async () => {
      await assertRejects(
        () => startUserSession({
          email: "fakeemail@example.com", password: "password123"
        }),
        AppError,
      )
    })

    await testStep.step("It should not start a new session if given password is wrong", async () => {
      await assertRejects(
        () => startUserSession({
          email: "session@example.com", password: "fakepassword123"
        }),
        AppError,
      )
    })
  })
})
