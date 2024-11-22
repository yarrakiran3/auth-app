import React from 'react'
import { auth } from '../../../auth';
import { fetchUserDetails, logOut } from '../lib/actions';
import Link from 'next/link';

export default async function Herosection() {

    const  session = await auth();
     
if(!session?.user||session.user===null||session.user===undefined||session.user.email==="") {
    return(
        <div className='flex justify-center mt-12'>
        <p>Please 
        <Link href={"/auth/signin"}
        className='text-blue-500 p-2 ml-2 mt-2 rounded-xl'>Sign In</Link>
        to continue
        </p>
        </div>
    )
} else {

  return (
    <div className='flex justify-center mt-12'>
        <div>
            <p>You have successfully logged in!</p>
            <p>To view your profile <Link href={"/profile"} className='text-lightblue'>click here</Link></p>
        </div>
    </div>
  )

}

}


export async function NavBarSignInSignOut(){
    const  session = await auth();
if(!session?.user||session.user===null||session.user===undefined||session.user.email==="") {
return(
        <div >
        <Link href={"/auth/signin"}
        className='bg-blue-500 h-8 p-2 ml-2 mt-2 rounded-xl text-white'>Sign In</Link>
        
        </div>
)
} else {
  return (
    <div >
    <form action={logOut}>
    <button
      className='bg-blue-500 p-2 ml-2 mt-2 rounded-xl text-white
      '>Sign Out</button>
    </form>
    </div>
  )
}
    
}