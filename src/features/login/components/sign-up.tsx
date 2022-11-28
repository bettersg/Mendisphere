import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";

export default function Signup(){


    return (

            <Flex >
                <Spacer />
                <Box p="1" >
                    <Text color="grey" as='b'>Don't Have an account? </Text>
                </Box>
                <Box p="1">
                    <Link href="/"><Text color="blue" as='b'>Sign up</Text></Link>
                </Box>
                <Spacer />
            </Flex>

    )
}