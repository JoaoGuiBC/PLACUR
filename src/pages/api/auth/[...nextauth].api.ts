import NextAuth, { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '@lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/login?message=verifyEmail',
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },
}

export default NextAuth(authOptions)
