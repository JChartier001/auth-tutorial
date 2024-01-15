"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const SettingsPage =  () => {
  const user = useCurrentUser()
  const onClick = () => {
    signOut();
  
  }
  
  return (
    <div className='bg-white p-10 rounded'>
    
      <button onClick={onClick} >Logout</button>
      </div>
  )
}

export default SettingsPage