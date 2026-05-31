import { CherrySvg } from '@/components/ui/icons/CherrySvg';
import { welcomeProps } from '@/components/ui/icons/defaultProps';
import { LoginForm } from './LoginForm';

export default async function Login({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const awaitedSearchParams = await searchParams;
  const redirectUrl = awaitedSearchParams.redirect;

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-1.5 sm:px-3">
      <div className="flex flex-col items-center rounded-lg border-2 bg-card/85 p-4 text-center shadow-[0_10px_0_hsl(var(--foreground)/0.06)]">
        <CherrySvg {...welcomeProps} width="130px" height="130px" />
        <h4 className="mb-2 text-xl font-extrabold leading-tight">
          Hola! Èxit Sortida d'Emergència et dona la benvinguda al joc de les
          CIRÈXITS!
        </h4>
      </div>

      <div className="rounded-lg border-2 bg-secondary/80 p-4 text-lg font-bold text-secondary-foreground">
        <h5>
          Estem buscant els millors gens torrellencs! Qui collirà més cireres?
          N'hem amagat 500 per tot el poble!
        </h5>
      </div>

      <LoginForm redirectUrl={redirectUrl as string} />

      <h5 className="text-center font-extrabold">
        Busca-les, cull-les i porta-nos-les el diumenge a les 13h al Parc de Can
        Sostres.
      </h5>
      <p className="text-center">
        La persona que hagi collit més cirèxits s'endú un val de 100€ per gastar
        en comerços locals.
      </p>
    </div>
  );
}
