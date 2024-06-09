import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from "react";

export default function EmailCredential() {
  const [show, setShow] = React.useState(false);
  const [noText, setNoText] = React.useState(true);

  const handleClick = () => setShow(!show);

  const handleChange = (event: any) => {
    if (event.target.value.length > 0) {
      setNoText(false);
    } else {
      setNoText(true);
    }
  };

  return (
    <Flex>
      <VStack spacing={4} align="stretch" minWidth="100%">
        <Box>
          <Text>Email</Text>
          <Input placeholder="Enter your email" />
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
      </VStack>
    </Flex>
  );
}
