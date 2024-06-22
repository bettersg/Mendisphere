import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";

export default function Signup() {
  return (
    <Flex marginTop={6}>
      <Spacer />
      <Box p="1">
        <Text color="grey" as="b">
          Don't Have an account?{" "}
        </Text>
      </Box>
      <Box p="1">
        <Link href="/registration">
          <Text color="blue" as="b">
            Sign up
          </Text>
        </Link>
      </Box>
      <Spacer />
    </Flex>
  );
}
