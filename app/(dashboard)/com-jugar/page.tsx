import { CherrySvg } from '@/components/ui/icons/CherrySvg';
import { QuestionIcon } from '@/components/ui/question-icon/QuestionIcon';
import { BACKGROUND_COLORS, mapBackgroundColor } from '@/lib/variants';
import { PIECE_SCORE } from 'app/constants';
import { InstagramIcon } from 'lucide-react';

export default async function HowToPlay() {
  return (
    <div className="flex flex-wrap gap-2 justify-center px-4 leading-6">
      <h1>Com es juga?</h1>
      <p>
        El joc consisteix en trobar les peces anomenades{' '}
        <b className="text-xl">"Cirèxits"</b> que han estat amagades per tot el
        poble.
      </p>
      <div className="flex gap-2">
        <p className="w-[70%]">
          Quan en trobis una, hauràs d'escanejar el codi QR que trobaràs a la
          part del darrere de la peça i <b>quedar-te-la</b>. Cada una que
          trobis, afegirà {PIECE_SCORE} punt a la teva puntuació total.
        </p>
        <div className="w-[30%]">
          <CherrySvg
            backgroundColor={mapBackgroundColor[BACKGROUND_COLORS.BLUE]}
            shape="circle"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-[30%]">
          <QuestionIcon
            backgroundColor={mapBackgroundColor[BACKGROUND_COLORS.YELLOW]}
          />
        </div>
        <p className="w-[70%]">
          A més, de tant en tant, t'apareixerà una pregunta sobre Torrelles que
          hauràs de respondre correctament. Si ho aconsegueixes, obtindràs 1
          punts extra per cada una.
        </p>
      </div>

      <p>Qui aconsegueixi més punts al final del joc, rebrà una recompensa!</p>
      <p className="text-lg text-center">
        Vine el <b>diumenge a les 13:00h al Parc de Can Sostres</b> per entregar
        les cirèxits que hagis collit!
      </p>

      <div className="flex gap-2 pt-2">
        <div className="flex flex-col items-end">
          <p className="text-right">
            Més info a l'Instagram d'ÈXIT SORTIDA D'EMERGÈNCIA
          </p>
          <a href="https://www.instagram.com/exitsortidademergencia/">
            @exitsortidademergencia
          </a>
        </div>
        <InstagramIcon />
      </div>
    </div>
  );
}
