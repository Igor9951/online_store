'use server'

import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt'
import { cookies } from "next/headers"
import { randomUUID } from 'crypto'
import { getInfo } from './getInfo'


export async function loginPerform(email,password){


  const info=await getInfo();

  const user=await prisma.user.findUnique({
    where:{
      email:email,
    },
  })

  console.log(user)


if(!user){
 return {status:1}
}
  const checkPassword =await bcrypt.compare(password,user.password)

  if(!checkPassword){
    return {status:1}
  }

  // 🔍 Шукаємо активну сесію
  const existingSession = await prisma.session.findFirst({
    where: {
      userId: user.id,
      expires: { gt: new Date() }, 
    },
  });

  let sessionToken = existingSession?.sessionToken;

  if(sessionToken && (info.model==existingSession.deviceName || info.os==existingSession.os || info.browser==existingSession.browser)){

     const cookieStore = await cookies();
  cookieStore.set("sessionToken",sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires:existingSession.expires,
    path: "/",
  });
  
  return {status:2}
  }
  else{
const token = randomUUID();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 днів

  await prisma.session.create({
    data: {
      sessionToken:token,
      userId: user.id,
      expires,
      deviceName:info?.model,
      os:info?.os,
      browser:info?.browser
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("sessionToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  });

  return {status:2}
  }
}