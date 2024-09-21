import { MenuOpen, People, Settings } from '@mui/icons-material';
import React, { useState } from 'react';
import avatar from '../assets/IMG_1969.png'
import reportIcon from '../assets/vector.svg'
import DashboardIcon from '../assets/podium.svg'
import peopleIcon from '../assets/people.svg'
import cashIcon from '../assets/cash.svg'
import spannerIcon from '../assets/vector-se.svg'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSettingsPopup = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <div className={`h-[100vh] flex flex-col items-start shadow-2xl ${isOpen ? 'w-[330px]' : 'w-[80px]'} transition-[width] duration-500 ease-in-out relative`}>
            <MenuOpen 
                onClick={toggleSidebar}
                sx={{
                    width: '40px',
                    height: '40px',
                    position: 'absolute',
                    top: '8px',
                    left: isOpen? '210px' : '20px',
                    transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                    transition: 'transform 500ms ease-in-out, left 300ms ease-in-out',
                    cursor: 'pointer',
                }}
            />
            <div className='flex w-full gap-12 font-bold flex-col mt-20'>
                <div className={`flex flex-col items-center gap-4 transition-all duration-200 ease-in-out transform ${isOpen ? 'max-h-[100%] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className='w-[102px] h-[102px] bg-slate-100 shadow-lg rounded-full'>
                        <img className='w-full rounded-full h-full' src={avatar} alt="" />
                    </div>
                    <div className=' flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Nosirudeen Olalekan</h1>
                        <h1 className='text-2xl font-normal text-[#989898]'>Admin</h1>
                    </div>
                </div>
                <div className='flex flex-col px-1 gap-1'>
                    <div className='flex items-center py-2 px-5 border-l-2 border-l-red-300'>
                        <div className='flex gap-5 items-center'>
                            <img src={DashboardIcon}
                                sx={{
                                    width: '28px',
                                    height: '28px',  
                                }}     
                            />
                            <p className={` text-2xl font-normal transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 max-w-full scale-100' : 'opacity-0 max-w-0 scale-0'} overflow-hidden`}>
                                Dashboard
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center py-2 px-5 border-l border-l-red-300'>
                        <div className='flex gap-5 items-center'>
                            <img src={peopleIcon} 
                                sx={{
                                    width: '28px',
                                    height: '28px',  
                                }}     
                            />
                            <p className={` text-2xl font-normal transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 max-w-full scale-100' : 'opacity-0 max-w-0 scale-0'} overflow-hidden`}>
                                User Management
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center py-2 px-5 border-l-2 border-l-red-300'>
                        <div className='flex gap-5 items-center'>
                            <img src={cashIcon} 
                                sx={{
                                    width: '28px',
                                    height: '28px',  
                                }}     
                            />
                            <p className={` text-2xl font-normal transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 max-w-full scale-100' : 'opacity-0 max-w-0 scale-0'} overflow-hidden`}>
                                Price Config
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center py-2 px-5 border-l-2 border-l-red-300'>
                        <div className='flex gap-5 items-center'>
                            <img src={spannerIcon} 
                                sx={{
                                    width: '28px',
                                    height: '28px',  
                                }}     
                            />
                            <p className={` text-2xl font-normal transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 max-w-full scale-100' : 'opacity-0 max-w-0 scale-0'} overflow-hidden`}>
                                Operations
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center py-2 px-5 border-l-2 border-l-red-300'>
                        <div className='flex gap-5 items-center'>
                            <img src={reportIcon} 
                                sx={{
                                    width: '28px',
                                    height: '28px',  
                                }}     
                            />
                            <p className={` text-2xl font-normal transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 max-w-full scale-100' : 'opacity-0 max-w-0 scale-0'} overflow-hidden`}>
                                Reports
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-8 left-6 cursor-pointer" onClick={toggleSettingsPopup}>
                <Settings 
                    sx={{
                        width: '24px',
                        height: '24px',
                        color: '#a28089',
                        transform: isSettingsOpen ? 'rotate(540deg)' : 'rotate(0deg)',
                        transition: 'transform 500ms ease-in-out',
                    }} 
                />
            </div>

            {/* Pop-up for Settings */}
            {isSettingsOpen && (
                <div className="absolute bottom-20 left-12 bg-white p-4 rounded-xl shadow-lg transition-transform transform origin-bottom-left duration-300 ease-out"
                    style={{ transform: isSettingsOpen ? 'scale(1)' : 'scale(0)' }}>
                    <div className="relative">
                        {/* Protruding Edge from the Settings Icon */}
                        <div className="absolute -left-4 bottom-3 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent" />
                        <p className="text-[#a28089]">Settings Options</p>
                        <p className="text-[#a28089]">Settings Options</p>
                        <p className="text-[#a28089]">Settings Options</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
