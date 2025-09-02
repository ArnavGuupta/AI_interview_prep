"use server";

import { auth,db } from "@/firebase/admin";
import {cookies} from "next/headers";
const ONE_WEEK = 60 * 60 * 24 * 7;



export default async function signUp(params: SignUpParams) {
    const { uid,email, name } = params;

        try {
            const userRecord = await db.collection("users").doc(uid).get();

            if (userRecord.exists) {
                return {
                    success: false,
                    message: "Account already exists. Please sign in instead.",
                };
            }

            await db.collection("users").doc(uid).set({
                email,
                name,
            });
            return {
                success: true,
                message: "Account created successfully,please sign in.",
            }
        }
        catch(error : any){
     console.log("Error creating a user",error)
        if(error.code==="auth/email-already-exists"){
            return{
                success:false,
                message:"Email already exists",
            }
        }
        return{
            success:false,
            message:"Failed to create an account",
        }
    }
}


export async function signIn(params:SignInParams){
    const {email,idToken} = params;
    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return{
                success:false,
                message:"Account doesnt exist,Create an account instead"
            }
        }
        await setSessionCookies(idToken)

    }catch(error) {
        console.log(error)
    }

}
export async function setSessionCookies(idToken:string) {
    const cookiestore = await cookies()
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    })
    cookiestore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        path:"/",
        sameSite:"lax",

    })


}
export async function getCurrentUser():Promise<User|null>{
  const cookieStore = await cookies();
  const sessionCookies = cookieStore.get('Session')?.value;
  if(!sessionCookies){
      return null
  }
  try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookies, true)
      const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
      if (!userRecord.exists) return null;

      return {...userRecord.data(),id:userRecord.id,} as User
  }
  catch(error){
console.log(error)
  }
}
export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user
}