import React from 'react';
import { theme } from '../../theme';
import { Outlet } from 'react-router-dom';
import logo from '../../src/assets/ITalks Logo.png';

const AllPagesBackground = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>
            <Outlet/>
        </div>
    );
}

export default AllPagesBackground;
