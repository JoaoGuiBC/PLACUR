import { AppError } from "../../lib/appError.ts";
import { prisma } from "../../database/prismaClient.ts";
import { IUpdateUser } from "../../routes/users.routes.ts";

export async function updateUser(userData: IUpdateUser) {
  const cleanedDocument = userData.document.replace(/\D/g, "");
  const cleanedPhone = userData.phone.replace(/\D/g, "");

  const checkIfUserExists = await prisma.user.findFirst({
    where: { id: userData.id },
  });

  if (!checkIfUserExists) {
    throw new AppError(
      "Usuário não cadastrado no sistema",
      404,
    );
  }

  const checkIfEmailAlreadyTaken = await prisma.user.findFirst({
    where: { email: userData.email },
  });
  const checkIfDocumentAlreadyTaken = await prisma.user.findFirst({
    where: { document: cleanedDocument },
  });

  if (
    checkIfEmailAlreadyTaken &&
    checkIfEmailAlreadyTaken.id !== checkIfUserExists.id
  ) {
    throw new AppError(
      "E-mail já cadastrado",
      403,
    );
  }
  if (
    checkIfDocumentAlreadyTaken &&
    checkIfDocumentAlreadyTaken.id !== checkIfUserExists.id
  ) {
    throw new AppError(
      "CPF já cadastrado",
      403,
    );
  }

  const user = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      ...userData,
      document: cleanedDocument,
      phone: cleanedPhone,
    },
  });
  /*console.log(checkIfUserExists);
  console.log(user);*/

  return { user };
}
