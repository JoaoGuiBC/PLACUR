import {
  assertEquals,
  assertExists,
  assertRejects,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";

import { AppError } from "../../lib/appError.ts";

import { createUser, deleteUser, findUser, updateUser } from "./index.ts";

Deno.test("Users services", async (test) => {
  const newUser = {
    id: "fakeUserId",
    email: "johndoe@example.com",
    password: "password123",
    name: "John Doe",
    document: "123.456.789-10",
    phone: "(99) 99999-9999",
    isPublicAgent: false,
    address: "Fake street, 123",
    neighborhood: "Fake neighborhood",
    city: "Fake city",
    haveVisualImpairment: false,
    haveHearingImpairment: false,
    hasPhysicalDisability: false,
    isAdmin: false,
  };
  const comparativeUser = {
    id: "fakeid",
    email: "testemail@example.com",
    password: "password123",
    name: "John Doe",
    document: "32132132100",
    phone: "(99) 99999-9999",
    isPublicAgent: false,
    address: "Fake street, 123",
    neighborhood: "Fake neighborhood",
    city: "Fake city",
    haveVisualImpairment: false,
    haveHearingImpairment: false,
    hasPhysicalDisability: false,
    isAdmin: false,
  };

  await test.step("User creation", async (testStep) => {
    await testStep.step("It should create a new user", async () => {
      const { user: insertedUser } = await createUser(newUser);

      assertExists(insertedUser);
      assertEquals(insertedUser.email, "johndoe@example.com");
    });

    await testStep.step(
      "It should not create a new user with an already used email or document",
      async () => {
        await assertRejects(
          () => createUser(newUser),
          AppError,
        );
      },
    );
  });

  await test.step("User listing", async (testStep) => {
    await testStep.step("It should be able to get user by id", async () => {
      const { user } = await findUser("fakeUserId");

      assertExists(user);
      assertEquals(user.email, "johndoe@example.com");
    });
  });

  await test.step("User data update", async (testStep) => {
    await testStep.step(
      "It should be able to update the user data",
      async () => {
        newUser.email = "newemail@example.com";

        const { user } = await updateUser(newUser);

        assertEquals(user.email, "newemail@example.com");
      },
    );

    await testStep.step(
      "It should not be able to update the user data when using an already taken email or document",
      async () => {
        newUser.email = "testemail@example.com";
        newUser.document = "32132132100";

        await createUser(comparativeUser);

        await assertRejects(
          () => updateUser(newUser),
          AppError,
        );
        await deleteUser("fakeid");
      },
    );

    await testStep.step(
      "It should throw a custom error when updating a non-existent user",
      async () => {
        newUser.id = "invalidId";

        await assertRejects(
          () => updateUser(newUser),
          AppError,
        );
      },
    );
  });

  await test.step("User deletion", async (testStep) => {
    await testStep.step(
      "It should be able to delete a user using their ID",
      async () => {
        await deleteUser("fakeUserId");

        await assertRejects(
          () => findUser("fakeUserId"),
          AppError,
        );
      },
    );
  });
});
