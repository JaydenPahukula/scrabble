import words from 'src/data/words.json';
import Letter from 'src/types/letter';

const wordsArr: string[] = shuffle(words);
const getWord = (): string => wordsArr[Math.floor(Math.random() * wordsArr.length)];
const wordsSet = new Set<string>(wordsArr);
const isWord = (word: string): boolean => wordsSet.has(word);

let tileCoords: [number, number][] = [];

export function resetAlgorithm() {
  tileCoords = [];
}

export function placeFirstWord(grid: Letter[][]): Letter[][] {
  const centerX = Math.floor(grid[0].length / 2);
  const word = getWord();
  for (let y = 0; y < word.length; y++) {
    //@ts-expect-error
    grid[y][centerX] = word[y];
    tileCoords.push([centerX, y]);
  }
  return grid;
}

export function placeWord(grid: Letter[][]): Letter[][] {
  const W = grid[0].length;
  const H = grid.length;
  for (let _ = 0; _ < 100; _++) {
    const word = getWord();
    // console.log(word, _, '=================');
    // try all available tiles
    for (const [x, y] of shuffle(tileCoords)) {
      // console.log('  starting at', y, x);
      const c = grid[y][x];
      let start = 0;
      let i;
      while (start < word.length && (i = word.indexOf(c, start)) !== -1) {
        // console.log('    offset =', i);
        let fail = false;
        // try horizontally
        // console.log('    checking horizontally starting at ', y, x - i);
        for (let j = 0; j < word.length; j++) {
          const x1 = x - i + j;
          if (x1 < 0 || x1 >= W || (grid[y][x1] !== '' && grid[y][x1] !== word[j])) {
            fail = true;
            break;
          }
        }
        if (!fail) {
          let newGrid = grid.map((row) => [...row]);
          let newTiles: [number, number][] = [];
          for (let j = 0; j < word.length; j++) {
            const x1 = x - i + j;
            if (newGrid[y][x1] === '') newTiles.push([x1, y]);
            //@ts-expect-error
            newGrid[y][x1] = word[j];
          }
          if (newTiles.length > 0 && checkGrid(newGrid)) {
            tileCoords = tileCoords.concat(newTiles);
            return newGrid;
          }
        }
        // try vertically
        fail = false;
        // console.log('    checking vertically starting at ', y - i, x);
        for (let j = 0; j < word.length; j++) {
          const y1 = y - i + j;
          if (y1 < 0 || y1 >= H) {
            fail = true;
            break;
          }
          if (grid[y1][x] !== '' && grid[y1][x] !== word[j]) {
            fail = true;
            break;
          }
        }
        if (!fail) {
          let newGrid = grid.map((row) => [...row]);
          let newTiles: [number, number][] = [];
          for (let j = 0; j < word.length; j++) {
            const y1 = y - i + j;
            if (newGrid[y1][x] === '') newTiles.push([x, y1]);
            //@ts-expect-error
            newGrid[y1][x] = word[j];
          }
          if (newTiles.length > 0 && checkGrid(newGrid)) {
            tileCoords = tileCoords.concat(newTiles);
            return newGrid;
          }
        }
        start = i + 1;
      }
    }
  }
  console.error('STUCK');
  return grid;
}

function checkGrid(grid: Letter[][]): boolean {
  // console.log('      checking', grid);
  const W = grid[0].length;
  const H = grid.length;
  // check horizontally
  for (let y = 0; y < H; y++) {
    let word = '';
    for (let x = 0; x < W; x++) {
      if (grid[y][x] === '') {
        if (word !== '') {
          if (word.length > 1 && !isWord(word)) return false;
          word = '';
        }
      } else {
        word += grid[y][x];
      }
    }
    if (word.length > 1 && !isWord(word)) return false;
  }
  // check vertically
  for (let x = 0; x < W; x++) {
    let word = '';
    for (let y = 0; y < H; y++) {
      if (grid[y][x] === '') {
        if (word !== '') {
          if (word.length > 1 && !isWord(word)) return false;
          word = '';
        }
      } else {
        word += grid[y][x];
      }
    }
    if (word.length > 1 && !isWord(word)) return false;
  }
  return true;
}

function shuffle<T>(arr: T[]): T[] {
  let out = [...arr];
  let i = out.length;
  while (i > 0) {
    let r = Math.floor(Math.random() * i);
    i--;
    [out[i], out[r]] = [out[r], out[i]];
  }
  return out;
}
