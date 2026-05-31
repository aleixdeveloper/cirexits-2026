import { Alert } from '@/components/ui/alert/Alert';
import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';

export default async function LogoutPage() {
  const userSession = await auth();
  if (!userSession) {
    return <Alert variant="default">No tens cap sessió activa</Alert>;
  }

  return (
    <div className="grid place-items-center p-2 gap-4 max-w-lg mx-auto">
      <h3>Hola, {userSession.user.name}!</h3>
      <p>
        Aquesta és una funcionalitat restringida, no hauries de tancar la sessió
        o podries perdre tot el teu progrés,
      </p>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <div className="flex flex-col gap-4">
          <label>Estàs segur que vols sortir?</label>
          <Button variant="destructive" type="submit">
            SI
          </Button>
        </div>
      </form>
    </div>
  );
}
