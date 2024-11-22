import React from 'react'
import LoginForm from './ui/auth/login-form'
import Link from 'next/link'

export default function page() {
  return (
    <>
    <p>This is home page.</p>
    <p><Link href={"/profile"} className='text-middleblue'>Click Here</Link> to view your profile.</p>

    <br></br>
    <p><Link href={'/blogs'}>Click Here </Link> to view Blogs.</p>
     
    </>
  )
}
