import words from 'src/data/words.json';
import { shuffle } from 'src/sketch/shuffle';

const wordsArr: string[] = shuffle(words);
const wordsSet = new Set<string>(wordsArr);

const getWord = (): string => wordsArr[Math.floor(Math.random() * wordsArr.length)];

const isWord = (word: string): boolean => wordsSet.has(word);

export { getWord, isWord };
