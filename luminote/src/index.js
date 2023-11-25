import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams, } from "react-router-dom";

import './styles/theme.css'
//import './styles/gruvbox-theme.css'
import './styles/index.css';


import Home from './pages/Home.jsx';
import NoPage from './pages/NoPage.jsx';
import NotePage from './pages/NotePage.jsx';

const App = () => {

  return (
    <React.StrictMode>
      <BrowserRouter>  
            <Routes>
              <Route
                index
                element={<Home />}
              />
              <Route
                path='notebook/:notebookId/:noteId'
                element={<NotePage />}

              />
              <Route
                path='*'
                element={<NoPage />}

              />
            </Routes> 
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
