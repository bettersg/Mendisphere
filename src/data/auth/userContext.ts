import { createContext } from "react"

export interface UserContextState {
    isAuthenticated: boolean
    isLoading: boolean
    id?: string
  }

  export const UserStateContext = createContext<UserContextState>(
    {} as UserContextState,
  )