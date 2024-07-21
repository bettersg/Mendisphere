import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Signup from "./SignUp";
import GoogleSignInButton from "./GoogleSignInButton";
import SignInButton from "./SignInButton";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [noText, setNoText] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const handleChange = (event: any) => {
    if (event.target.value.length > 0) {
      setNoText(false);
    } else {
      setNoText(true);
    }

    setPassword(event.target.value);
  };

  return (
    <VStack spacing={4} align="stretch" minWidth="100%">
      <Box>
        <Text>Email</Text>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <Text>Password</Text>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={handleChange}
          ></Input>

          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              disabled={noText}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box>
        <ForgotPassword />
      </Box>
      <Box>
        <Box>
          <SignInButton email={email} password={password} />
          {/* <Box>
                        <GoogleSignInButton />
                    </Box> */}
        </Box>
        <Signup />
      </Box>
    </VStack>
  );
}
