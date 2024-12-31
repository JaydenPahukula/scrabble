import { ReactP5Wrapper } from '@p5-wrapper/react';
import sketch from 'src/sketch/sketch';

export default function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
