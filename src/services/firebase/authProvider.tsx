import { useEffect,useState,useContext} from 'react'
import { auth } from './FirebaseConfig'
import { UserCredential,User,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,} from 'firebase/auth'
import { AuthProviderProps } from './AuthProviderProps'
import { UserContextState, UserStateContext } from '../../data/Auth/UserContext'
import { AuthContextModel } from '../../data/Auth/AuthContextModel'
import { AuthContext } from '../../data/Auth/AuthContext'

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const values = {
    signUp,
    user,
    signIn,
    resetPassword,
    auth,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext);
};
