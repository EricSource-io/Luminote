import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams, } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

import './styles/theme.css'
//import './styles/gruvbox-theme.css'
import './styles/index.css';


import Home from './pages/Home.jsx';
import NoPage from './pages/NoPage.jsx';
import NotePage from './pages/NotePage.jsx';
import Editor from './pages/Editor.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={<Home />}
            />
            <Route
              path='notebook/:notebookId'
              element={<NotePage />}

            />
            <Route
              path='notebook/:notebookId/:noteId'
              element={<NotePage />}

            />
             <Route
              path='editor'
              element={<Editor />}
            />
            <Route
              path='*'
              element={<NoPage />}
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
