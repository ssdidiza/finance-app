import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the accounts table
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

// Define relationships for the accounts table
export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
}));

// Create schema for inserting into the accounts table
export const insertAccountSchema = createInsertSchema(accounts);

// Define the categories table
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

// Define relationships for the categories table
export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

// Create schema for inserting into the categories table
export const insertCategorySchema = createInsertSchema(categories);

// Define the transactions table
export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),  // Changed to text
  date: timestamp("date", { mode: "date" }).notNull(),
  accountId: text("account_id")
    .references(() => accounts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
});

// Define relationships for the transactions table
export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
// Create schema for inserting into the transactions table
export const insertTransactionSchema = createInsertSchema(transactions, {
    date: z.coerce.date()
});