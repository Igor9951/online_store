"use server"

import { prisma } from '../lib/prisma';
import { sendMail } from "./sendEmail";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

async function generateCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

export async function createUser(name, lastName, email, phone, password) {
  const check = await prisma.user.findUnique({ where: { email } });

  if (check && check.verificationCode) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { email },
      data: {
        name,
        lastName,
        phone,
        password: hashedPassword,
        role: "user",
      },
    });
    return { status: 2 };
  }

  if (check && !check.verificationCode) {
    return { status: 3 };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const code = await generateCode(6);

  const user = await prisma.user.create({
    data: {
      name,
      lastName,
      phone,
      email,
      password: hashedPassword,
      role: "user",
      verificationCode: code,
      codeExpires: new Date(Date.now() + 1 * 60 * 1000),
    },
  });

  await sendMail(user.email, code);

  
  const cookieStore = cookies();
  cookieStore.set("verify_email", user.email, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 10,
  });

  return { status: 1 };
}
