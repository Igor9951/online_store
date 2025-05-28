"use server"

import { prisma } from '../lib/prisma';
import { sendMail } from "./sendEmail";
import bcrypt from 'bcrypt';

async function generateCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

export async function createUser(name, lastName, email, phone, password) {

  const check = await prisma.user.findUnique({
    where: { email }
  });

  // 1 – користувача створено, але не підтверджено email
  // 2 – користувача вже зареєстровано і email підтверджено
  // 3 – користувач уже існує, і йому не потрібно підтверджувати email

  if (check && check.verificationCode) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await db.user.update({
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

  return { status: 1 };
}
