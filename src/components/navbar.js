import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [toggleHamburger, setToggleHamburger] = useState(false)
    return (
        <div className='relative'>
            <div className=' h-16 bg-gray-700 w-full flex flex-row justify-between items-center px-7'>
                <Link to={"/"} className='text-gray-300 hover:text-gray-200 text-xl lg:text-2xl font-bold lg:font-extrabold cursor-pointer'>
                    MINI CASE SWR PRISMA
                </Link>
                <div className="hidden lg:flex gap-5">
                    <Link to={"/"} className='text-gray-300 hover:text-gray-200 text-base font-medium cursor-pointer'>Pets</Link>
                    <Link to={"/category"} className='text-gray-300 hover:text-gray-200 text-base font-medium cursor-pointer'>Category</Link>
                </div>
                {toggleHamburger 
                    ? <div className="block lg:hidden p-2 space-y-2 bg-gray-600 rounded shadow" onClick={() => setToggleHamburger(false)}>
                        <svg
                            className="h-8 w-8 text-gray-200 animate-pulse"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                    : <div className="block lg:hidden p-3 space-y-2 bg-gray-600 rounded shadow" onClick={() => setToggleHamburger(true)}>
                        <span className="block w-8 h-0.5 bg-gray-200 animate-pulse"></span>
                        <span className="block w-8 h-0.5 bg-gray-200 animate-pulse"></span>
                        <span className="block w-8 h-0.5 bg-gray-200 animate-pulse"></span>
                    </div>
                }
            </div>
            <div className={`lg:hidden ${toggleHamburger ? "flex" : "hidden"} top-16 px-9 flex-col gap-3 bg-gray-200 w-screen z-10 absolute drop-shadow-md`}>
                <Link onClick={() => setToggleHamburger(false)} to={"/"} className='mt-5 text-gray-700 hover:text-gray-600 text-lg font-medium cursor-pointer'>Pets</Link>
                <Link onClick={() => setToggleHamburger(false)} to={"/category"} className='mb-5 text-gray-700 hover:text-gray-600 text-lg font-medium cursor-pointer'>Category</Link>
            </div>
        </div>
    )
}

export default Navbar