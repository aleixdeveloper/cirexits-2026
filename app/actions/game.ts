'use server';

import { prepareQuestionForUser, submitAnswer } from 'services/questionService';

export async function handleScanAction(userId: string, pieceId: string) {
  try {
    /*   const updatedPieceMetadata = await getPieceWithFinder(pieceId);
     */

    // Auto-prepare their next trivia payload challenge
    const nextQuestion = await prepareQuestionForUser(userId);

    //revalidatePath('/game');
    return {
      success: true,
      nextQuestion
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function handleAnswerSubmitAction(
  userId: string,
  questionId: string,
  choice: 'A' | 'B' | 'C'
) {
  try {
    const evaluation = await submitAnswer(userId, questionId, choice);
    //revalidatePath('/profile');
    return { success: true, ...evaluation };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
