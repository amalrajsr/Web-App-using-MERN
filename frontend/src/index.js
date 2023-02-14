import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor=persistStore(store)
root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <App />
      </PersistGate>
    </Provider>
);

