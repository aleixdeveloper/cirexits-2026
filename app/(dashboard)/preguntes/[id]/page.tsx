'use client';
import { Question } from '@/components/question';

export default async function QuestionDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsAwaited = await params;
  const { id } = paramsAwaited;
  return (
    <div className="min-h-full h-full">
      <Question
        onSubmitAnswer={() => {}}
        question={{
          question:
            "Aquesta bonica imatge de festa i xerinola és de començament del segle XX. S'hi veu una munió de gent jugant a “trencar l'olla” per celebrar la inauguració d'una prestigiosa botiga del municipi. Sabríeu dir en quin carrer podem localitzar-la?",
          optionA: 'GROCS, TARONGES, VERMELLS, BLAUS, BLANCS, NEGRES I LILES',
          optionB: 'GROCS, TARONGES, VERMELLS, BEIGE, BLANCS, NEGRES I LILES',
          optionC: 'GROCS, TARONGES, VERMELLS, BLAUS, BLANCS, VERD I LILES',
          imageUrl: '/images/question1.png',
          id: '1'
        }}
      />
    </div>
  );
}
