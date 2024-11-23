import Link from "next/link"
import { NavBarSignInSignOut } from "./herosection"


export default function NavBar(){

    return(
<nav className="flex flex-row  dark:text-white ">
<div className=" flex items-center justify-between mx-auto p-4 md:p-5">
    <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse"> 
        <span className="self-center text-2xl mt-2 md:text-4xl md:font-extrabold whitespace-nowrap inline-block bg-gradient-to-r from-lightblue via-middleblue to-darkblue text-transparent bg-clip-text">
        Auth App
        </span>    
    </Link>  
  </div>
  <div className="flex flex-col justify-around">
        <NavBarSignInSignOut/>
  </div>
</nav>

    )
}