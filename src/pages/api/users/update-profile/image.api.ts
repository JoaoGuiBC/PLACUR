import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { v2 as cloudinary } from 'cloudinary'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const updateImageBodySchema = z.object({
  image: z.string(),
  userId: z.string().cuid({ message: 'Informe um id válido' }),
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(401).end()
  }

  const { image, userId } = updateImageBodySchema.parse(req.body)

  const uploadedImage = await cloudinary.uploader.upload(image, {
    public_id: userId,
    folder: 'placur/user-avatar',
  })

  await prisma.user.update({
    where: { id: userId },
    data: { image: uploadedImage.url },
  })

  return res.status(204).end()
}
