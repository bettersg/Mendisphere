import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from "./sign-up-waiting";

export default function SignUpButton(LoginCredentials: LoginCredentials) {
  const disable: boolean = !LoginCredentials.validated;

  const navigate = useNavigate();

  return (
    <VStack spacing={4} align="stretch">
      <Button
        // disabled={disable}
        colorScheme="blue"
        onClick={() => {
          navigate("/profile-setup", { state: LoginCredentials });
        }}
      >
        Sign Up
      </Button>
    </VStack>
  );
}
