import { openDB } from "idb";

const DB_NAME = "CACHE_DB";
const DB_VERSION = 1;

export const IMAGE_CACHE_STORE = "image_cache";

function upgrade(db, oldVersion) {
  if (oldVersion < 1) {
    // We will use this store for persisting local states
    db.createObjectStore(IMAGE_CACHE_STORE);
  }
}

export default () => openDB(DB_NAME, DB_VERSION, { upgrade });
