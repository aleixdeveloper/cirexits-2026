import { User as DbUser } from '@/lib/db/schema';
import 'next-auth';

declare module 'next-auth' {
  interface User extends DbUser {}

  interface Session {
    user: {
      id: string;
      name: string;
      email?: string;
      isAdmin: boolean;
    } & DefaultSession['user'];
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser extends DbUser {}
}
