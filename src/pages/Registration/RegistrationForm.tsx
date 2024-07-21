import {
  Box,
  Button,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Input,
  Center,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import SignUpButton from "./SignUpButton";
import {
  IsPasswordMinLength,
  //   DoPasswordsMatch,
  IsValidEmail,
  IsValidName,
  PasswordContainsLowercase,
  PasswordContainsNumber,
  PasswordContainsSymbol,
  PasswordContainsUppercase,
} from "../../utilities/validators";
import SignIn from "./SignIn";
import { ImCheckboxChecked, ImCross } from "react-icons/im";

const RegistrationForm = () => {
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
    password: {
      text: "",
      numChecked: 0,
      color: "",
      checks: {
        "Minimum length": false,
        Number: false,
        Symbol: false,
        Uppercase: false,
        Lowercase: false,
      },
    },
    confirmPassword: "",
    valid: false,
  });

  const [show, setShow] = useState(false);
  const [noText, setNoText] = useState(true);

  const handleClick = () => setShow(!show);

  const onInputChange = (event: any) => {
    const { name, value } = event.target;
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
      let errorState;
      if (name == "password") {
        errorState = { ...prev };
      } else {
        errorState = { ...prev, [name]: "" };
      }
      errorState.valid = canEnableSignUpButton();

      switch (name) {
        case "email":
          if (!IsValidEmail(value)) {
            errorState.email = "Please enter a valid email.";
            errorState.valid = false;
          }
          break;
        case "givenName":
          if (!IsValidName(value)) {
            errorState.givenName = "Please enter a valid name.";
            errorState.valid = false;
          }
          break;
        case "famName":
          if (!IsValidName(value)) {
            errorState.famName = "Please enter a valid name.";
            errorState.valid = false;
          }
          break;

        case "password":
          // case "confirmPassword":
          setNoText(typeof value != "undefined" && value.length < 1);

          errorState.password.text = "Strong, your password is secure 💪";
          errorState.password.checks = {
            "Minimum length": true,
            Number: true,
            Symbol: true,
            Uppercase: true,
            Lowercase: true,
          };

          let numChecked = 5;

          if (!PasswordContainsSymbol(value)) {
            errorState.password.text = "Almost there, add a special symbol 😉";
            errorState.password.checks["Symbol"] = false;
            errorState.valid = false;
            numChecked -= 1;
          }

          if (!PasswordContainsNumber(value)) {
            errorState.password.text = "So-so, should be alphanumeric 😕";
            errorState.password.checks["Number"] = false;
            errorState.valid = false;
            numChecked -= 1;
          }

          if (!PasswordContainsUppercase(value)) {
            errorState.password.text =
              "Weak, must have at one uppercase and lowercase letter 😖";
            errorState.password.checks["Uppercase"] = false;
            errorState.valid = false;
            numChecked -= 1;
          }

          if (!PasswordContainsLowercase(value)) {
            errorState.password.text =
              "Weak, must have at one uppercase and lowercase letter 😖";
            errorState.password.checks["Lowercase"] = false;
            errorState.valid = false;
            numChecked -= 1;
          }

          if (!IsPasswordMinLength(value)) {
            errorState.password.text = "Must have at least 8 characters.";
            errorState.password.checks["Minimum length"] = false;
            errorState.valid = false;
            numChecked -= 1;
          }

          errorState.password.numChecked = numChecked;
          switch (numChecked) {
            case 1:
              errorState.password.color = "red";
              break;
            case 2:
            case 3:
              errorState.password.color = "yellow.300";
              break;
            case 4:
              errorState.password.color = "blue";
              break;
            case 5:
            default:
              errorState.password.color = "green.400";
              break;
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
        <Text marginBottom={2}>Given Name*</Text>
        <Input
          name="givenName"
          value={input.givenName}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.givenName && <Box className="errorMsg">{error.givenName}</Box>}
      </Box>
      <Box>
        <Text marginBottom={2}>Family Name*</Text>
        <Input
          name="famName"
          value={input.famName}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.famName && <Box className="errorMsg">{error.famName}</Box>}
      </Box>
      <Box>
        <Text marginBottom={2}>Email*</Text>
        <Input
          name="email"
          value={input.email}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.email && <Box className="errorMsg">{error.email}</Box>}
      </Box>
      <Box>
        <Text marginBottom={2}>Password*</Text>
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
      </Box>
      <Box>
        <Center>
          <Box
            w={0}
            h={0}
            filter="drop-shadow(0 -2px 2px #AAA)"
            borderLeft="20px solid transparent"
            borderRight="20px solid transparent"
            borderBottom="20px solid white"
          />
        </Center>
        <Box boxShadow="0px 0px 8px #AAA" rounded="lg" p={3}>
          <Text>{error.password.text}</Text>
          <HStack spacing={2} py={4}>
            {[...Array(error.password.numChecked)].map(() => (
              <Box h={1} bg={error.password.color} flexGrow={1} />
            ))}
            {[...Array(5 - error.password.numChecked)].map(() => (
              <Box h={1} bg="gray.300" flexGrow={1} />
            ))}
          </HStack>
          <VStack alignItems="flex-start" spacing={1}>
            {Object.entries(error.password.checks).map(([item, checked]) => (
              <HStack spacing={2}>
                <Icon
                  as={checked ? ImCheckboxChecked : ImCross}
                  color={checked ? "green.400" : "red"}
                />
                <Text>{item}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
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
};

export default RegistrationForm;
