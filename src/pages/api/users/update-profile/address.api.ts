import { z } from "zod";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";
import { authOptions } from "../../auth/[...nextauth].api";

const updateAddressBodySchema = z.object({
  address: z
    .string()
    .min(4, { message: "Informe o seu endereço." })
    .transform((value) => value.toLowerCase()),
  neighborhood: z
    .string()
    .min(4, { message: "Informe o seu bairro." })
    .transform((value) => value.toLowerCase()),
  city: z
    .string()
    .min(4, { message: "Informe a sua cidade." })
    .transform((value) => value.toLowerCase()),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).end();
  }

  const { address, neighborhood, city } = updateAddressBodySchema.parse(
    req.body
  );

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      address,
      neighborhood,
      city,
    },
  });

  return res.status(204).end();
}
