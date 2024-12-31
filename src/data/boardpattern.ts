// board cell pattern

// types:
// 0 - regular
// 1 - double letter
// 2 - triple letter
// 3 - double word
// 4 - triple word
// 5 - start

const boardPattern: number[][] = [
  [4, 0, 0, 1, 0, 0, 0, 4],
  [0, 3, 0, 0, 0, 2, 0, 0],
  [0, 0, 3, 0, 0, 0, 1, 0],
  [1, 0, 0, 3, 0, 0, 0, 1],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 2, 0, 0, 0, 2, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [4, 0, 0, 1, 0, 0, 0, 5],
];

export default boardPattern;
