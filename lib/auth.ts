import NextAuth from 'next-auth';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    {
      id: 'name',
      name: 'Name',
      type: 'credentials',
      credentials: {
        name: { label: 'Name', type: 'text' }
      },
      async authorize(credentials: { name?: string }) {
        if (!credentials?.name) return null;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.name, credentials.name))
          .limit(1);

        if (user) {
          return {
            id: user.id,
            name: user.name,
            isAdmin: false
          };
        }

        const [newUser] = await db
          .insert(users)
          .values({ name: credentials.name })
          .returning();

        return {
          id: newUser.id,
          name: newUser.name,
          isAdmin: false
        };
      }
    },
    Credentials({
      id: 'admin-token',
      name: 'Admin Token',
      credentials: {
        token: { label: 'Token', type: 'text' }
      },
      async authorize(credentials) {
        if (credentials?.token === process.env.ADMIN_SECRET_HASH) {
          return {
            id: 'admin',
            name: 'Admin',
            isAdmin: true
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    //@ts-ignore
    async redirect({ url, baseUrl }) {
      return url ?? null;
    },
    //@ts-ignore
    async session({ session, token }) {
      // Customize the returned session
      session.user = {
        id: token.id,
        name: token.name,
        isAdmin: token.isAdmin
      };
      return session;
    },
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.isAdmin = user.isAdmin;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  }
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth(authOptions as any);
