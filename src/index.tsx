import * as ReactDOM from 'react-dom/client';
import App from 'src/app/app';
import './index.css';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(<App />);
} else {
  console.error('Could not find root div');
}
