import Dexie from "dexie";
import { nanoid } from "nanoid";

export function getDB() {
  const db = new Dexie("estimator");
  db.version(1).stores({
    statuses: "++id",
    issues: "++id",
    tasks: "++id,issueId",
  });
  return db;
}

export function mergeRequiredKeys(obj) {
  const now = new Date().toUTCString();

  const newObj = {
    ...obj,
    updatedAt: now,
  };

  if (!newObj.createdAt) {
    newObj.createdAt = now;
  }

  if (!newObj.id) {
    newObj.id = nanoid();
  }

  return newObj;
}
