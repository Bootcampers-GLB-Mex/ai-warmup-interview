'use client';
import Image from "next/image";

const NavBar = () => {
  return <div> 
    <nav className="bg-glob-100 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-200">
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
  </div> ;  
}

export default NavBar;