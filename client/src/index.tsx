import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from 'reportWebVitals';
import App from 'components/App';
import { store } from 'redux/store';
import 'index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
