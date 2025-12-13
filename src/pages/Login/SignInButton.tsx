import { Button, VStack } from "@chakra-ui/react";
import { UserCredential } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationRequestData } from "../../data/Auth/AuthRequestData";
import { useAuth } from "../../services/Firebase/AuthProvider";
import { loginUser } from "../../services/UserService";

interface LoginCredentials {
  email: string;
  password: string;
}

export default function SignInButton(LoginCredentials: LoginCredentials) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authRequest: AuthenticationRequestData = {
    userName: "",
  };

  const handleSignIn = async () => {
    console.log(
      `sign in button clicked ${LoginCredentials.email}, ${LoginCredentials.password}`
    );
    try {
      setLoading(true);
      const user = await loginUser(
        LoginCredentials.email,
        LoginCredentials.password
      );

      console.log(`Authentication success for user: ${user.id}`);

      // Check email verification status
      if (!user.emailVerified) {
        console.warn("Email not verified");
        // Optionally redirect to verification page or show warning
      }

      console.log("Routing to user dashboard page.");
      navigate("/dashboard");
    } catch (error: unknown) {
      let errorMessage = "Authentication failed";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(`Authentication failed: ${errorMessage}`);
      // Optionally show error to user via toast/alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Button colorScheme="blue" isLoading={isLoading} onClick={handleSignIn}>
        Sign in
      </Button>
    </VStack>
  );
}
