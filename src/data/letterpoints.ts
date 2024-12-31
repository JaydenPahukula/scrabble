// letter point values

export default function points(l: string) {
  if (l.length !== 1) return 0;
  if ('AEIOULNSTR'.includes(l)) return 1;
  if (l === 'D' || l === 'G') return 2;
  if (l === 'B' || l === 'C' || l === 'M' || l === 'P') return 3;
  if (l === 'F' || l === 'H' || l === 'V' || l === 'W' || l === 'Y') return 4;
  if (l === 'K') return 5;
  if (l === 'J' || l === 'X') return 8;
  if (l === 'Q' || l === 'Z') return 10;
  return 0;
}
