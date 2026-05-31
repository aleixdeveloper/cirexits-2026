'use client';

import { useModal } from 'app/context/ModalContext';
import { CherrySvg } from '../icons/CherrySvg';
import { Modal } from '.';
import { welcomeProps } from '../icons/defaultProps';
import { useEffect } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { useRouter } from 'next/navigation';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage/localStorage';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { login } from '@/lib/users/login';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';

// Anywhere in your app, client component
export default function OpenWelcomeModalButton() {
  const { openModal } = useModal();

  return <button onClick={openModal}>Open Welcome Modal</button>;
}

export const ModalBenvinguda = (
  {
    /*   open,
  onClose,
  onOpen */
  }: {
    /*   open: boolean;
  onClose: () => void;
  onOpen: () => void; */
  }
) => {
  const { openModal, closeModal, isOpen } = useModal();
  const router = useRouter();

  const { pending } = useFormStatus();

  useEffect(() => {
    let value;
    value = getItem(STORAGE_KEYS.WELCOME_MODAL);
    if (value !== 'hide') {
      openModal();
    }
  }, []);

  const handleClose = () => {
    setItem(STORAGE_KEYS.WELCOME_MODAL, 'hide');
    closeModal();
  };

  const formAction = async (formData: FormData) => {
    const name = formData.get('name');

    if (!name) {
      return;
    }

    await signIn('name', {
      name,
      redirect: false
    });
    handleClose();
  };

  return (
    <Modal
      title="Ei! Has trobat una CIRÈXIT"
      open={isOpen}
      onClose={handleClose}
      withCloseButton={false}
      className={cn('w-[calc(100%-1rem)] h-[calc(100%-1rem)]')}
    >
      <div className="flex flex-col items-center">
        <CherrySvg {...welcomeProps} width="150px" height="150px" />
        <h4 className="font-semibold text-center text-xl mb-2">
          Hola! Èxit Sortida d'Emergència et dona la benvinguda al joc de les
          CIRÈXITS!
        </h4>
      </div>

      <div className="text-lg">
        <h5>
          Estem buscant els millors gens torrellencs! Qui collirà més cireres?
          N'hem amagat 500 per tot el poble!
        </h5>
      </div>

      <form
        action={formAction}
        className="flex flex-col gap-6 text-lg p-4 bg-slate-100 rounded-xl border-4 border-slate-300"
      >
        <p>
          Si us plau, abans de començar a jugar, indica'ns el teu Nom i Cognom
        </p>
        <Input
          required
          type="text"
          name="name"
          defaultValue=""
          placeholder="Nom i Cognom"
          size={20}
        />
        <Button disabled={pending} type="submit">
          {pending && <Loader2 className="animate-spin" />}
          Enviar
        </Button>
      </form>
      <h5 className="text-center">
        Busca-les, cull-les i porta-nos-les el diumenge a les 13h al Parc de Can
        Sostres.
      </h5>
      <p className="text-center">
        La persona que hagi collit més cirèxits s'endú un val de 100€ per gastar
        en comerços locals.
      </p>
    </Modal>
  );
};
