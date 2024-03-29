'use client';
import Image from "next/image";
import { createContext, useContext, useState } from 'react';

const NavBarContext = createContext();

const NavBar = () => {
  return <NavBarContext.Provider value="test"> 
    <nav className="bg-teal-900 dark:bg-teal-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
      <Image
          src="/logo.png"
          alt="Globant Logo"
          width={100}
          height={58}
          priority
      />
    </a>
    </div>
  </nav>
  </NavBarContext.Provider> ;  
}

export default NavBar;