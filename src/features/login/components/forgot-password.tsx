import { Box, Flex, Link, Spacer,  Text } from '@chakra-ui/react'



export default function ForgotPassword(){

    return (
        <Flex >
            <Box p='1'></Box>
            <Spacer />
            <Box p='1' >
                <Link href="/"><Text color="blue" as='b'>Forgot password</Text></Link>
            </Box>
        </Flex>
    )
}