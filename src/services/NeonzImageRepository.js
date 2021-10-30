import openDB, { IMAGE_CACHE_STORE } from "./Database";

export default class NeonzImageRepository {
  async getImage(id) {
    const cacheImage = await this.fetchFromCache(id);

    if (cacheImage) return cacheImage;
    else {
      const image = await this.fetchFromServer(id);

      if (image) {
        await this.saveToCache(id, image);
        return image;
      }
    }

    return null;
  }

  async fetchFromCache(id) {
    const db = await openDB();
    return db.get(IMAGE_CACHE_STORE, id);
  }

  async saveToCache(id, image) {
    const db = await openDB();
    db.add(IMAGE_CACHE_STORE, image, id);
  }

  fetchFromServer(id) {
    return fetch(id, { method: "GET" }).then((response) => {
      return response.arrayBuffer().then((buffer) => {
        const prefix = "data:image/gif;base64,";
        const value = arrayBufferToBase64(buffer);
        return prefix + value;
      });
    });
  }
}

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}
