'use server';

import { signIn } from '@/lib/auth';

function hasAtLeastThreeWords(str: string): boolean {
  const words = str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length >= 3;
}

export async function loginAction(_prevState: any, formData: FormData) {
  const name = formData.get('name');
  const redirectUrl = formData.get('redirectUrl');

  if (!name) {
    return {
      errors: {
        message: `Has d'introduir Nom i Cognoms`
      }
    };
  }

  if (!hasAtLeastThreeWords(name as string)) {
    return {
      errors: {
        message: `Has d'introduir Nom i Cognoms`
      }
    };
  }

  await signIn('name', {
    name,
    redirect: true,
    redirectTo: redirectUrl as string
  });

  return {
    success: 'Has entrat al joc!',
    errors: {
      message: ''
    }
  };
}
