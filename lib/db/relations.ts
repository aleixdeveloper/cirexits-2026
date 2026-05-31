// db/relations.ts
import { relations } from 'drizzle-orm';
import { users, questions, questionAttempts } from './schema';

//
// QUESTIONS
//
export const questionsRelations = relations(questions, ({ many }) => ({
  attempts: many(questionAttempts)
}));

//
// QUESTION ATTEMPTS
//
export const questionAttemptsRelations = relations(
  questionAttempts,
  ({ one }) => ({
    user: one(users, {
      fields: [questionAttempts.userId],
      references: [users.id]
    }),

    question: one(questions, {
      fields: [questionAttempts.questionId],
      references: [questions.id]
    })
  })
);
