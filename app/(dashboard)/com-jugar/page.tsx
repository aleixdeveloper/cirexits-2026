import { CherrySvg } from '@/components/ui/icons/CherrySvg';
import { QuestionIcon } from '@/components/ui/question-icon/QuestionIcon';
import { BACKGROUND_COLORS, mapBackgroundColor } from '@/lib/variants';
import { PIECE_SCORE } from 'app/constants';
import { InstagramIcon } from 'lucide-react';

export default async function HowToPlay() {
  return (
    <div className="mx-auto flex h-full max-w-xl flex-wrap items-center justify-center gap-3 rounded-lg border-2 bg-card/85 px-4 py-5 leading-7 shadow-[0_10px_0_hsl(var(--foreground)/0.06)]">
      <h1>Com es juga?</h1>
      <p className="font-semibold">
        El joc consisteix en trobar les peces anomenades{' '}
        <b className="text-xl">"Cirèxits"</b> que han estat amagades per tot el
        poble.
      </p>
      <div className="flex gap-3 rounded-lg bg-secondary/70 p-3">
        <p className="w-[70%] font-semibold">
          Quan en trobis una, hauràs d'escanejar el codi QR que trobaràs a la
          part del darrere de la peça i <b>quedar-te-la</b>. Cada una que
          trobis, afegirà {PIECE_SCORE} punt a la teva puntuació total.
        </p>
        <div className="w-[30%]">
          <CherrySvg backgroundColor={'#FFF'} shape="circle" />
        </div>
      </div>
      <div className="flex gap-3 rounded-lg bg-accent/70 p-3 text-accent-foreground">
        <div className="w-[30%]">
          <QuestionIcon backgroundColor={'#000'} />
        </div>
        <p className="w-[70%] font-semibold">
          A més, de tant en tant, t'apareixerà una pregunta sobre Torrelles que
          hauràs de respondre correctament. Si ho aconsegueixes, obtindràs 1
          punts extra per cada una.
        </p>
      </div>

      <p>Qui aconsegueixi més punts al final del joc, rebrà una recompensa!</p>
      <p className="text-center text-lg font-extrabold">
        Vine el <b>diumenge a les 13:00h al Parc de Can Sostres</b> per entregar
        les cirèxits que hagis collit!
      </p>

      <div className="flex justify-center items-center gap-2 rounded-full border-2 bg-card px-4 py-2 pt-2">
        <div className="flex flex-col items-center">
          <p className="text-center">
            Més info a l'Instagram d'ÈXIT SORTIDA D'EMERGÈNCIA
          </p>
          <a href="https://www.instagram.com/exitsortidademergencia/">
            @exitsortidademergencia
          </a>
        </div>
        <InstagramIcon className="h-8 w-8" />
      </div>
    </div>
  );
}
