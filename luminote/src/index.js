import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/theme.css'
import './styles/index.css';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import NoPage from './pages/NoPage.jsx';
import NotePage from './pages/NotePage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path='notes/:noteId' element={<NotePage />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
