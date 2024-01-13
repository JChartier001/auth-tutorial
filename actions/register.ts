'use server'
import { getUserByEmail } from "@/data/user";
import {db} from "@/lib/db"
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
 

  if (!validatedFields.success) {
    return {error: "Invalid Fields"}
  }

   const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const existingUser = await getUserByEmail(email)

  if (existingUser) { 
    return {error: "Email already exists"}
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  //TODO: send verification token email
return { success: 'User Created' };
//  return {success: "Email Sent"}
}