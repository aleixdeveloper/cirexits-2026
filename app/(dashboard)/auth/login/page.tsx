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
    <div className="max-w-lg mx-auto flex flex-col px-1.5 sm:px-3 gap-3">
      <div className="flex flex-col items-center">
        <CherrySvg {...welcomeProps} width="130px" height="130px" />
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

      <LoginForm redirectUrl={redirectUrl as string} />

      <h5 className="text-center">
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
