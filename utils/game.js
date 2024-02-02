import { TextureLoader } from "three";

export const loadTexture = (url) => {
  const textureLoader = new TextureLoader();
  const loadedTexture = textureLoader.load(url);
  // Customize texture properties if needed
  loadedTexture.wrapS = THREE.RepeatWrapping;
  loadedTexture.wrapT = THREE.RepeatWrapping;
  loadedTexture.repeat.set(1, 1);
  return loadedTexture;
};
