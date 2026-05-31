'use server';

import { signIn } from '@/lib/auth';

export const login = async (name: string) => {
  await signIn('name', { name });
};

export const adminLogin = async (password: string) => {
  await signIn('admin', {
    redirect: true,
    callbackUrl: '/admin',
    name: 'admin',
    password
  });
};
