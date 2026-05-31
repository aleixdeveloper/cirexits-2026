import { UserSession } from 'types';
import { auth } from '../auth';

export const getCurrentUser = async (): Promise<UserSession | null> => {
  const session = await auth();
  return session?.user;
};
