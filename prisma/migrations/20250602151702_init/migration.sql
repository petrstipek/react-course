-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "priority" TEXT DEFAULT 'Low',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DueDate" DATETIME,
    "pinned" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Todo" ("DueDate", "completed", "createdAt", "description", "id", "name", "priority") SELECT "DueDate", "completed", "createdAt", "description", "id", "name", "priority" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
