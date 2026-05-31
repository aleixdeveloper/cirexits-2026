import { CherrySvg } from '@/components/ui/icons/CherrySvg';
import { welcomeProps } from '@/components/ui/icons/defaultProps';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import {
  backgroundColorVariants,
  cherryColorVariants,
  leafVariants,
  mapBackgroundColor,
  mapColor,
  stemVariants
} from '@/lib/variants';

export default async function MainPage() {
  const session = await getCurrentUser();

  return (
    <div className="grid place-items-center h-full max-w-md mx-auto">
      <div className="flex flex-col gap- justify-center items-center">
        <h1>ON SÓN LES CIRÈXITS?</h1>
        <CherrySvg
          {...welcomeProps}
          cherryColorReflected="#fdd"
          cherryColorLeaf={mapColor[leafVariants[2]]}
          cherryColorStem={mapColor[stemVariants[1]]}
          cherryColorDark={cherryColorVariants[4][1]}
          cherryColorLight={cherryColorVariants[4][0]}
          backgroundColor={mapBackgroundColor[backgroundColorVariants[2]]}
          width="200px"
          height="200px"
        />
        <p className="text-center text-xl">
          El joc d'ÈXIT SORTIDA D'EMERGÈNCIA per la Festa de la Cirera 2026 de
          Torrelles de Llobregat
        </p>
      </div>
    </div>
  );
}
