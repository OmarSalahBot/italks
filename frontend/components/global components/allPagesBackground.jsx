import React from 'react';
import { theme } from '../../theme';
import { Outlet } from 'react-router-dom';
import logo from '../../src/assets/ITalks Logo.png';

const AllPagesBackground = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
            </div>
            <Outlet/>
        </div>
    );
}

export default AllPagesBackground;