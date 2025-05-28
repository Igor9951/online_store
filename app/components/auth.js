"use server"

import { prisma } from '../lib/prisma';
import { cookies } from "next/headers";

export async function auth(requireAdmin=false) {

  const cookie=await cookies()
  const sessionToken = cookie.get("sessionToken")?.value;

  console.log(sessionToken);

  if (!sessionToken) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  console.log(session)

  if (requireAdmin && session.user.role=='user') {
    return null
  }

  if (!session || session.expires < new Date()) {
    return null
  }

  return session.user

}