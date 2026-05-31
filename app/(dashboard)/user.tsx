import { signOut } from '@/lib/auth';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import { Session } from 'next-auth';

type UserProps = {
  session: Session | null;
};
export function User({ session }: UserProps) {
  const isAdmin = session?.user.isAdmin;
  return (
    <div className="flex gap-1 items-center">
      <div className="overflow-hidden rounded-full">
        <Image
          src={'/placeholder-user.jpg'}
          width={28}
          height={28}
          alt="Avatar"
          className="overflow-hidden rounded-full"
        />
      </div>
      <p className="max-w-[160px] line-clamp-1 text-xs">{session?.user.name}</p>
      {isAdmin && (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit" className="p-0">
            <LogOutIcon className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
