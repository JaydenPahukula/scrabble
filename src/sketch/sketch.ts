import { Sketch } from '@p5-wrapper/react';
import boardPattern from 'src/data/boardpattern';

// constants
const W = 15;
const CELL_RATIO = 1.05;
const BORDER_SIZE = 0.1; // vs cell width
const TRIANGLE_RATIO = 1.2;
const SHADOW_SIZE = 0.6;
const SHADOW_OPACITY = 0.1;

// colors
const BORDER_COLOR = '#FFFFFF';
const CELL_COLORS = ['#decea9', '#acdffa', '#3397cc', '#f5c0a9', '#f58453', '#f5c0a9'];

function reflect(i: number, n: number): number {
  n -= 1;
  return Math.floor(i / n) % 2 == 0 ? i % n : n - (i % n);
}

const sketch: Sketch = (p5) => {
  let H = 0;
  let cW = 0; // cell width
  let cH = 0; // cell height
  let grid: string[][] = [];

  function reset() {
    // recalculate size
    cW = document.body.clientWidth / W;
    cH = cW * CELL_RATIO;
    H = Math.floor(document.body.clientHeight / cH) + 1;
    // reset arrays
    grid = Array(H).fill(Array(W).fill(''));
  }

  p5.setup = () => {
    p5.createCanvas(document.body.clientWidth, document.body.clientHeight);
    p5.frameRate(30);
    p5.noStroke();
    reset();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
    reset();
  };

  p5.draw = () => {
    p5.background(BORDER_COLOR);
    // draw cells
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        const x = j * cW;
        const y = i * cH;
        const b = (cW * BORDER_SIZE) / 2;
        const type =
          boardPattern[reflect(i, boardPattern.length)][reflect(j, boardPattern[0].length)];

        p5.fill(CELL_COLORS[type]);

        const T = TRIANGLE_RATIO * 2 * b;
        const xC = x + cW / 2; // horizontal center
        const yC = y + cH / 2; // vertical center
        if (type === 1 || type === 3 || type === 5) {
          // double triangles
          p5.triangle(xC - T, y + b + 1, xC - T / 2, y - b, xC, y + b + 1);
          p5.triangle(xC, y + b + 1, xC + T / 2, y - b, xC + T, y + b + 1);
          p5.triangle(x + b + 1, yC - T, x - b, yC - T / 2, x + b + 1, yC);
          p5.triangle(x + b + 1, yC, x - b, yC + T / 2, x + b + 1, yC + T);
          p5.triangle(xC - T, y + cH - b - 1, xC - T / 2, y + cH + b, xC, y + cH - b - 1);
          p5.triangle(xC, y + cH - b - 1, xC + T / 2, y + cH + b, xC + T, y + cH - b - 1);
          p5.triangle(x + cW - b - 1, yC - T, x + cW + b, yC - T / 2, x + cW - b - 1, yC);
          p5.triangle(x + cW - b - 1, yC, x + cW + b, yC + T / 2, x + cW - b - 1, yC + T);
        } else if (type === 2 || type === 4) {
          // triple triangles
          p5.triangle(xC - T * 1.5, y + b + 1, xC - T, y - b, xC - T / 2, y + b + 1);
          p5.triangle(xC - T / 2, y + b + 1, xC, y - b, xC + T / 2, y + b + 1);
          p5.triangle(xC + T / 2, y + b + 1, xC + T, y - b, xC + T * 1.5, y + b + 1);
          p5.triangle(x + b + 1, yC - T * 1.5, x - b, yC - T, x + b + 1, yC - T / 2);
          p5.triangle(x + b + 1, yC - T / 2, x - b, yC, x + b + 1, yC + T / 2);
          p5.triangle(x + b + 1, yC + T / 2, x - b, yC + T, x + b + 1, yC + T * 1.5);
          p5.triangle(xC - T * 1.5, y + cH - b - 1, xC - T, y + cH + b, xC - T / 2, y + cH - b - 1);
          p5.triangle(xC - T / 2, y + cH - b - 1, xC, y + cH + b, xC + T / 2, y + cH - b - 1);
          p5.triangle(xC + T / 2, y + cH - b - 1, xC + T, y + cH + b, xC + T * 1.5, y + cH - b - 1);
          p5.triangle(x + cW - b - 1, yC - T * 1.5, x + cW + b, yC - T, x + cW - b - 1, yC - T / 2);
          p5.triangle(x + cW - b - 1, yC - T / 2, x + cW + b, yC, x + cW - b - 1, yC + T / 2);
          p5.triangle(x + cW - b - 1, yC + T / 2, x + cW + b, yC + T, x + cW - b - 1, yC + T * 1.5);
        }

        p5.rect(x + b, y + b, cW - 2 * b, cH - 2 * b);

        // shadow
        const S = (1 - SHADOW_SIZE) * b;
        p5.fill(0, 0, 0, 255 * SHADOW_OPACITY);
        p5.beginShape();
        p5.vertex(x + S, y + cH - S);
        p5.vertex(x + S, y + S);
        p5.vertex(x + cW - S, y + S);
        p5.vertex(x + cW - b, y + b);
        p5.vertex(x + b, y + b);
        p5.vertex(x + b, y + cH - b);
        p5.endShape();
      }
    }
  };
};

export default sketch;
