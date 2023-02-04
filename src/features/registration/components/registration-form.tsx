import {
  Box,
  Button,
  Container,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Input,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import SignUpButton from "./sign-up-button";
import {
  IsPasswordMinLength,
  //   DoPasswordsMatch,
  IsValidEmail,
  IsValidName,
} from "../../../utilities/validators";
import SignIn from "./sign-in";

export default function RegistrationForm() {
  const [input, setInput] = useState({
    givenName: "",
    famName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    givenName: "",
    famName: "",
    email: "",
    password: "",
    confirmPassword: "",
    valid: false,
  });

  const [show, setShow] = useState(false);
  const [noText, setNoText] = useState(true);

  const handleClick = () => setShow(!show);

  const onInputChange = (event: any) => {
    const { name, value } = event.target;
    // console.log(`change triggerred ${name} ${value}`)
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(event);
  };

  const canEnableSignUpButton = () => {
    return (
      input.email.length > 0 &&
      input.password.length > 0 &&
      input.givenName.length > 0 &&
      input.famName.length > 0
      //   input.confirmPassword.length > 0
    );
  };

  const validateInput = (event: any) => {
    let { name, value } = event.target;
    setError((prev) => {
      const errorState = { ...prev, [name]: "" };
      errorState.valid = canEnableSignUpButton();

      switch (name) {
        case "email":
          if (!IsValidEmail(value)) {
            errorState.email = "Please enter a valid email.";
            errorState.valid = false;
          }
          break;
        case "givenName":
        case "famName":
          if (!IsValidName(value)) {
            errorState.famName = "Please enter a valid name.";
            errorState.givenName = "Please enter a valid name.";
            errorState.valid = false;
          }
          break;

        case "password":
          // case "confirmPassword":
          setNoText(typeof value != "undefined" && value.length < 1);

          if (input.password && !IsPasswordMinLength(value)) {
            errorState.password =
              "Password must have a minimum of 8 characters and be alphanumeric.";
            errorState.valid = false;
          } else {
            errorState.password = "";
          }

          //   if (!DoPasswordsMatch(input.password, value)) {
          //     errorState.confirmPassword = "Passwords do not match.";
          //     errorState.valid = false;
          //   } else {
          //     errorState.confirmPassword = "";
          //   }

          break;
      }

      return errorState;
    });
  };

  return (
    <VStack spacing={4} align="stretch" minWidth="100%">
      <Box>
        <Text>Given Name*</Text>
        <Input
          name="givenName"
          value={input.givenName}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.givenName && <Box className="errorMsg">{error.givenName}</Box>}
      </Box>
      <Box>
        <Text>Family Name*</Text>
        <Input
          name="famName"
          value={input.famName}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.famName && <Box className="errorMsg">{error.famName}</Box>}
      </Box>
      <Box>
        <Text>Email*</Text>
        <Input
          name="email"
          value={input.email}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.email && <Box className="errorMsg">{error.email}</Box>}
      </Box>
      <Box>
        <Text>Password*</Text>
        <InputGroup size="md">
          <Input
            name="password"
            value={input.password}
            pr="4.5rem"
            type={show ? "text" : "password"}
            onChange={onInputChange}
            onBlur={validateInput}
          />

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
        {error.password && <Box className="errorMsg">{error.password}</Box>}
      </Box>
      {/* <Box>
        <Text>Confirm Password</Text>
        <Input
        name="confirmPassword"
        value={input.confirmPassword}
        pr="4.5rem"
        type={show ? "text" : "password"}
        onChange={onInputChange}
        onBlur={validateInput}
        />
        {error.confirmPassword && (
            <Box className="errorMsg">{error.confirmPassword}</Box>
            )}
        </Box> */}
      <Box>
        <Box>
          <SignUpButton
            email={input.email}
            password={input.password}
            validated={error.valid}
          />
        </Box>
        <SignIn />
      </Box>
    </VStack>
  );
}
