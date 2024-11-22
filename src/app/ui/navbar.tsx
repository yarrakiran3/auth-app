'use client'
import Link from "next/link"
import NavLinks from "./NavLinks"

import Image from "next/image";

import { useEffect, useState } from "react";
import { logOut } from "../lib/actions";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { auth } from "../../../auth";

export default function NavBar(){
  

  const [buttonClicked,setButtonIsClicked]=useState(false);
  const [isLinkClicked,seIsLinkClicked]=useState(false);
    return(
<nav className=" bg-white dark:bg-gradient-to-r dark:from-darkblue dark:via-middleblue dark:to-lightblue ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:p-5">
    <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
    
    <div className="block dark:hidden">
    <Image
            src={'/GS_Logo_Black.svg'}
            width={70}
            height={70}
            className="h-fit hidden md:block"
            alt="GradSculpt Logo">

    </Image>
    <Image
            src={'/GS_Logo_Black.svg'}
            width={50}
            height={50}
            className=" h-fit block md:hidden"
            alt="GradSculpt Logo">

    </Image>
    </div>
    <div className="hidden dark:block">
    <Image
            src={'/GS_Logo_White.svg'}
            width={70}
            height={70}
            className=" h-fit hidden md:block "
            alt="GradSculpt Logo">

    </Image>
    <Image
            src={'/GS_Logo_White.svg'}
            width={50}
            height={50}
            className=" h-fit block md:hidden"
            alt="GradSculpt Logo">

    </Image>
    </div>
    
      
        <span className="self-center text-2xl mt-2 md:text-4xl md:font-extrabold whitespace-nowrap inline-block bg-gradient-to-r from-darkblue via-middleblue to-lightblue text-transparent bg-clip-text">
        GradSculpt
        </span>
        
    </Link>
    

    



    <button onClick={()=>{setButtonIsClicked(!buttonClicked),seIsLinkClicked(false)}} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg block md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <Bars3Icon/>
    </button>
    <Link href={"/auth/signin"}
    className='bg-blue-500 p-2 ml-2 mt-2 rounded-xl'> Sign In</Link>
    <form action={logOut}>
    <button
      className='bg-blue-500 p-2 ml-2 mt-2 rounded-xl'> Sign Out</button>
    </form>


    <div className="hidden w-full md:block md:w-auto" >
      <ul className="font-7xl flex p-4 md:p-4 
      bg-white dark:bg-gray-900 
      md:flex-row md:space-x-8 
      rtl:space-x-reverse md:mt-0 md:border-0 
      ">
        <NavLinks isLinkClicked={isLinkClicked} setIsLinkClicked={seIsLinkClicked} setButtonIsClicked={setButtonIsClicked}/>
      </ul>
    </div>


  </div>


  {buttonClicked&&!isLinkClicked&&
          <div className="text-white font-roboto text-lg ml-8 block md:hidden mr-12">
          <NavLinks isLinkClicked={isLinkClicked} setIsLinkClicked={seIsLinkClicked} setButtonIsClicked={setButtonIsClicked}/>
          
        </div>
  }

  {/* {
    !session&&session===null&&session===undefined&&<Link href={"/auth/signin"}
    className='bg-blue-500 p-2 ml-2 mt-2 rounded-xl'> Sign In</Link>
  }    
    
  {session&&session!==null&&session!==undefined&&
    <form action={logOut}>
    <button
      className='bg-blue-500 p-2 ml-2 mt-2 rounded-xl'> Sign Out</button>
    </form>
  } */}
</nav>

    )
}