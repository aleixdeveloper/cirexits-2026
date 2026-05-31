import { NextResponse } from 'next/server';
import { scanPiece } from 'services/pieceService';
import { prepareQuestionForUser } from 'services/questionService';

export async function POST(request: Request) {
  try {
    const { userId, pieceId } = await request.json();

    if (!userId || !pieceId) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 }
      );
    }

    const scan = await scanPiece(userId, pieceId);
    const challengeQuestion = await prepareQuestionForUser(userId);

    return NextResponse.json({
      message: scan
        ? 'Scan logged successfully'
        : 'Piece already tracked for this profile',
      challengeQuestion
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
