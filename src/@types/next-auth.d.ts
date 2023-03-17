import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string,        
      name: string,
      email: string,
      emailVerified: Date,
      document: string,
      phone: string,
      image: string,
      address: string,
      neighborhood: string,
      city: string,
      have_visual_disability: boolean,
      have_physical_disability: boolean,
      have_hearing_disability: boolean,
      have_intellectual_disability: boolean,
      have_psychosocial_disability: boolean,
      is_admin: boolean,
      created_at: Date,
      updated_at: Date
    }
  }
}
