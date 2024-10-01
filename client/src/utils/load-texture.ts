import { TextureLoader } from "three";

const textureLoader = new TextureLoader();
const textureCache: { [key: string]: unknown } = {};

export const loadTexture = (url: string) => {
  if (textureCache[url]) {
    return Promise.resolve(textureCache[url]);
  }

  return new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      (texture) => {
        textureCache[url] = texture;
        resolve(texture);
      },
      undefined,
      (error) => reject(error)
    );
  });
};
