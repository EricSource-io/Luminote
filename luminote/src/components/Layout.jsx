import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import '../styles/layout.css';

function Layout ({ children }) {
    const location = useLocation();
    const isOpen = location.pathname !== '/';

    return (
        <div className='app-container'>
                 <Topbar />
            <div className='main-container'>
                <Sidebar isOpen={isOpen}/>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    );
}
export default Layout;