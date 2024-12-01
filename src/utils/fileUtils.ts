import { resolve } from 'path';
import { readdirSync } from 'fs';

export const getAssetPath = (assetsLocation: string) => {
    return resolve(__dirname, '../../assets/', assetsLocation);
}

export const getAssetPaths = (assetsLocation: string) => {
    const filePath = getAssetPath(assetsLocation);
    return readdirSync(filePath).map(fileName => resolve(filePath, fileName));
}

export const getRandomFilepath = (filePath: string) => {
    const filePaths = getAssetPaths(filePath);
    const randomIndex = Math.floor(Math.random() * filePaths.length);
    return filePaths[randomIndex];
}
