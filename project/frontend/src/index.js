import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {combineReducers, createStore, applyMiddleware} from 'redux'
import { TracksReducer } from './reducers/TracksReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from './logger';
import { ArtistsReducer } from './reducers/ArtistsReducer'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import HttpApi from 'i18next-http-backend'
import { Spinner } from 'react-bootstrap'
import LocalStorageBackend from "i18next-localstorage-backend";

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'pl'],
    fallbackLng: 'en',
    debug: false,
    backend: {
      backends: [
        LocalStorageBackend,
        HttpBackend
      ],
       loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })

const store = createStore(
  combineReducers({
    tracks: TracksReducer,
    artists: ArtistsReducer
  }), applyMiddleware(thunk, logger)
);

const loading = (
  <div>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
)

ReactDOM.render(
  <Suspense fallback={loading}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
