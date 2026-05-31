'use client';

import { useActionState } from 'react';
import { loginAction } from './action';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert/Alert';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const initialState = {
  success: '',
  errors: {
    message: ''
  }
};

export const LoginForm = ({ redirectUrl }: { redirectUrl: string }) => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 text-lg p-4 bg-slate-100 rounded-xl border-4 border-slate-300"
    >
      <input type="hidden" name="redirectUrl" value={redirectUrl} />
      <p>
        Si us plau, abans de començar a jugar, indica'ns el teu Nom i Cognoms
      </p>
      <Input
        required
        type="text"
        name="name"
        defaultValue=""
        placeholder="Nom i Cognoms"
        size={20}
      />
      {state?.errors.message && (
        <Alert variant="destructive">{state.errors.message}</Alert>
      )}
      <Button disabled={isPending} type="submit">
        {isPending && <Loader2 className="animate-spin" />}
        Enviar
      </Button>
    </form>
  );
};
