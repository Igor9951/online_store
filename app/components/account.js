"use client"

import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Account({userAuth}){
 
  const [authorise,setAuthorise]=useState(false);
  const [admin,setAdmin]=useState(null);

  useEffect(() => {
  if(userAuth){
       setAuthorise({
        name:userAuth.name,
        email:userAuth.email
      });
    if(userAuth.role=="admin"){
      setAdmin(true)
    }
  }
  else{
    setAuthorise(false)
  }
}, [userAuth]);

  return (
  <div className="w-1/6 self-center">
        <Image src="./person.svg" width={20} height={20} alt={'person'} className="bg-amber-50 rounded-full justify-self-center"></Image>
        
        {authorise ?<div><p className="text-white text-[10px] text-center">{authorise.name}</p><p className="text-white text-[10px] text-center">{authorise.email}</p></div>:
        <div><p className="text-white text-[10px] text-center"><Link href='/LogIn'>Вхід /</Link></p>
        <p className="text-white text-[10px] text-center"><Link href='/SignIn'>Реєстрація</Link></p></div>}
        {admin && <p className="text-white text-[10px] text-center">ADMIN</p>}
      </div>
  )
}