import { FirestoreAdapter } from "@auth/firebase-adapter";
import Google from "next-auth/providers/google";
import { db, firebaseCert } from "./firebase";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      createdAt: number;
      isTrial: boolean;
    } & DefaultSession["user"]
  }

  interface User {
    createdAt: number;
    isTrial?: boolean;
    isSubscribed?: boolean;
  }
}



import { Timestamp } from "firebase-admin/firestore";
import { TRIAL_DAYS } from "./config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  providers: [Google],
  events: {
    createUser: async ({ user }) => {
      await db.collection("users").doc(user.id as string).update({
        createdAt: Timestamp.now().toMillis(),
      })
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          isTrial: new Date(user.createdAt).getTime() > new Date().getTime() - 1000 * 60 * 60 * 24 * TRIAL_DAYS || false,
        }
      }
    },
  }
})