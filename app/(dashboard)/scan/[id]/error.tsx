'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('error', error);
  }, [error]);

  /*   const checkUserLoggedIn = async () => {
    const session = await auth();
    if (!session) {
      redirect(`/auth/login?redirect=/scan/${id}`);
    }
  } */

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h2>La lectura del QR ha sortit malament!</h2>
      <h5>Torna a intentar-ho</h5>
      <p>
        Si el problema persisteix, queda't amb el CIRÈXIT i porta'l diumenge a
        les 13h al Parc de Can Sostres
      </p>

      {/*   <Button onClick={checkUserLoggedIn}>Torna a intentar-ho</Button> */}
    </div>
  );
}
