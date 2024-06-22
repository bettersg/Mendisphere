import { Button, VStack } from "@chakra-ui/react";
import { User, UserCredential } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationRequestData } from "../../data/auth/authRequestData";
import { useAuth } from "../../services/firebase/authProvider";

interface LoginCredentials {
  email: string;
  password: string;
}

export default function SignInButton(LoginCredentials: LoginCredentials) {
  const [isLoading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const authRequest: AuthenticationRequestData = {
    userName: "",
  };

  const navigate = useNavigate();
  const handleSignIn = async () => {
    console.log(
      `sign in button clicked ${LoginCredentials.email}, ${LoginCredentials.password}`
    );
    try {
      setLoading(true);
      let userCred: UserCredential = await signIn(
        LoginCredentials.email,
        LoginCredentials.password
      );
      let user: User = userCred.user;
      let token: string = await user.getIdToken();
      console.log(`Authentication success userid: ${user.uid}, ${token}`);
      authRequest.userName = user.uid;
      console.log("Routing to user dashboard page.");
      navigate("/dashboard");
    } catch (error: unknown) {
      let errorMessage = "error.unknown";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.log(`Authentication failed ${errorMessage}`);
    }
    setLoading(false);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Button colorScheme="blue" isLoading={isLoading} onClick={handleSignIn}>
        Sign in
      </Button>
    </VStack>
  );
}
