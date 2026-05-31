import {
  pgTable,
  uuid,
  timestamp,
  integer,
  boolean,
  text,
  bigserial,
  unique,
  index
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true
  })
    .notNull()
    .defaultNow()
});

export type NewUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type BasicUser = Pick<SelectUser, 'id' | 'name'>;
export type SelectUserWithCount = SelectUser & {
  found_count: number;
  correct_answers?: number;
};

export const pieces = pgTable('pieces', {
  id: uuid('id').primaryKey(),
  hue: integer('hue').notNull(),
  foundByUserId: uuid('found_by_user_id').references(() => users.id),
  foundAt: timestamp('found_at', {
    withTimezone: true
  }),
  createdAt: timestamp('created_at', {
    withTimezone: true
  })
    .notNull()
    .defaultNow()
});

export type SelectPiece = typeof pieces.$inferSelect;
export type SelectPieceFoundBy = Omit<
  SelectPiece,
  'foundByUserId' | 'createdAt'
> & {
  foundBy: BasicUser | null;
};

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  optionA: text('option_a').notNull(),
  optionB: text('option_b').notNull(),
  optionC: text('option_c').notNull(),
  correctOption: text('correct_option', {
    enum: ['A', 'B', 'C']
  }).notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', {
    withTimezone: true
  })
    .notNull()
    .defaultNow()
});

export const questionAttempts = pgTable(
  'question_attempts',
  {
    id: bigserial('id', {
      mode: 'number'
    }).primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade'
      }),
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, {
        onDelete: 'cascade'
      }),
    shownAfterScanCount: integer('shown_after_scan_count').notNull(),
    selectedOption: text('selected_option', {
      enum: ['A', 'B', 'C']
    }),
    isCorrect: boolean('is_correct'),
    answeredAt: timestamp('answered_at', {
      withTimezone: true
    }),
    createdAt: timestamp('created_at', {
      withTimezone: true
    })
      .notNull()
      .defaultNow()
  },
  (table) => ({
    userQuestionUnique: unique().on(table.userId, table.questionId),
    userIdx: index('idx_question_attempts_user').on(table.userId),
    questionIdx: index('idx_question_attempts_question').on(table.questionId),
    pendingIdx: index('idx_question_attempts_pending').on(
      table.userId,
      table.answeredAt
    )
  })
);
