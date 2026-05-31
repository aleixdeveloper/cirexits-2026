import { auth } from '@/lib/auth';
import { UsersTable } from './users-table';
import { getUsers } from '@/lib/users/getAllUsers';
import { redirect } from 'next/navigation';
import { addScoreToUsers } from './utils';

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const { users, totalUsers } = await getUsers();
  const usersWithScore = addScoreToUsers(users);

  return <UsersTable users={usersWithScore} totalUsers={totalUsers} />;
}
