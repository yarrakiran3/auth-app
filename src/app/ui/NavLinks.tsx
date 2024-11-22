'use client';
import Link from "next/link";
import clsx from 'clsx'
import { usePathname } from "next/navigation";


const links = [
    
    {
        name:"About Us",
        href:"/about"
    },
    
]

export default function NavLinks({isLinkClicked,setIsLinkClicked,setButtonIsClicked}:{isLinkClicked:any,setIsLinkClicked:any,setButtonIsClicked:any}){
    const pathname =usePathname();
    return(
        links.map((link)=>{
            return(
                <Link key={link.name}
                onClick={()=>{setIsLinkClicked(true);setButtonIsClicked(false)}} 
                href={link.href} >
                
                <li  
                className={
                    clsx(
                        `block py-2 px-3 md:p-1
                          bg-gradient-to-r from-darkblue via-middleblue to-lightblue text-transparent bg-clip-text
                        rounded md:border-0
                        hover:text-blue-700 md:hover:text-blue-700
                        dark:hover:text-blue-500 md:dark:hover:text-blue-500 
                        md:dark:hover:bg-transparent
                        `,
                    {
                        "bg-orange-100 text-blue-500 dark:bg-slate-200 dark:text-blue-500 md:bg-orange-100 md:text-blue-500 md:dark:bg-slate-200 md:dark:text-blue-500" : pathname==link.href
                    }
                )}>
                            
                                    
                    {link.name}
                     
                    
                </li>

                </Link>

                
                
               
            )
        })
    )
}