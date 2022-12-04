import { Auth, User, UserCredential } from "firebase/auth"

export interface AuthContextModel {
    auth: Auth
    user: User | null
    signIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (email: string, password: string) => Promise<UserCredential>
    sendPasswordResetEmail?: (email: string) => Promise<void>
  }