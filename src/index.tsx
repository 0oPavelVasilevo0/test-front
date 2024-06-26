import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);