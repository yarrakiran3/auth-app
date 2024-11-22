import LoginForm from '@/app/ui/auth/login-form'
import React from 'react'
import { auth } from '../../../../auth'


export default async function Page() {
  return (
    <div>
      <LoginForm/>
    </div>
  )
}
