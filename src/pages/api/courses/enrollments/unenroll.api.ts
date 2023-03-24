import { z } from "zod";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";
import { authOptions } from "@api/auth/[...nextauth].api";

const enrollBodySchema = z.object({
  courseId: z.string().cuid(),
  userId: z.string().cuid(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).end();
  }

  const { courseId, userId } = enrollBodySchema.parse(req.query);

  await prisma.courseEnrollment.deleteMany({
    where: { user_id: userId, course_id: courseId },
  });

  return res.status(204).end();
}
