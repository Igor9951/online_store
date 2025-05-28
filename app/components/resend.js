"use server"

import { prisma } from '../lib/prisma';
import { sendMail } from "./sendEmail";

 function generateCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10); 
  }
  return code;
}

export async function resend(email){

 const validatedEmail=email.toString().replace('%40','@')

  const code=generateCode(6);

  try{
   const user=await prisma.user.findUnique({
    where:{
      email:email
    }
  })

  console.log(user.emailVerified)

  if(user.emailVerified===false){
 const updated=await prisma.user.update({
    where:{
      email:validatedEmail
    },
    data: {
      verificationCode: code,
      codeExpires: new Date(Date.now() + 1 * 60 * 1000),
    },
  });

  const sended =await sendMail(user.email,code); 

  return true
  }

  return false
  }
  catch(err){
    return false;
  }
}