'use server'
import { signOut } from "@/auth";

//only if need to do some server actions on logout

export const logout = async () => {
  await signOut();
};