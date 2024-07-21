import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from "./SignUpWaiting";
import { Paths } from "../../routing";

const SignUpButton = (LoginCredentials: LoginCredentials) => {
  const disable: boolean = !LoginCredentials.validated;

  const navigate = useNavigate();

  return (
    <Button
      // disabled={disable}
      width="full"
      marginTop={4}
      colorScheme="blue"
      onClick={() => {
        console.log(LoginCredentials);
        navigate(Paths.profileSetup, { state: LoginCredentials });
      }}
    >
      Sign Up
    </Button>
  );
};

export default SignUpButton;
