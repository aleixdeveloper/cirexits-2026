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
    <div className="grid h-full place-items-center px-2">
      <div className="relative mx-auto flex max-w-md flex-col items-center justify-center gap-5 overflow-hidden rounded-lg border-2 bg-card/85 p-5 text-center shadow-[0_12px_0_hsl(var(--foreground)/0.07)]">
        <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary" />
        <p className="relative rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em]">
          Festa de la Cirera 2026
        </p>
        <h1 className="relative text-balance">ON SÓN LES CIRÈXITS?</h1>
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
        <p className="relative text-balance text-xl font-extrabold leading-tight text-muted-foreground">
          El joc d'ÈXIT SORTIDA D'EMERGÈNCIA per la Festa de la Cirera 2026 de
          Torrelles de Llobregat
        </p>
      </div>
    </div>
  );
}
