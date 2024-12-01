import { resolve } from 'path';
import { readdirSync } from 'fs';

export const getAssetPath = (assetsLocation: string) => {
    return resolve(__dirname, '../../assets/', assetsLocation);
}

export const getAssetFilenames = (assetsLocation: string) => {
    const filePath = getAssetPath(assetsLocation);
    return readdirSync(filePath);
}

export const getRandomFile = (filePath: string) => {
    const fileNames = getAssetFilenames(filePath);
    const randomIndex = Math.floor(Math.random() * fileNames.length);
    return fileNames[randomIndex];
}
