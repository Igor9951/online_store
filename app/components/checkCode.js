'use server'

import { prisma } from '../lib/prisma';
import { cookies } from "next/headers";

export async function checkCode(code,email){

  const cookieStore =await cookies();
const validated_email=email.toString().replace('%40','@')

try{
const user=await prisma.user.findUnique({
  where:{
    email:email
  }
})

if (!user.codeExpires || user.codeExpires < new Date()) {
  return { success: false , codeExpires:false};
}

if(user?.verificationCode.toString()!=code?.toString()){
return {success:false,codeExpires:true}
}


await prisma.user.update({where:{
  email:email
},
data:{
  emailVerified:true,
  verificationCode:null,
  codeExpires:null
}
})

cookieStore.set("verify_email", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, 
    });

return {success:true,codeExpires:true}

}
catch(err){
  console.log(err)
}
}