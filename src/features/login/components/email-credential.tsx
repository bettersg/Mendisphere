import { Box, Container, Flex, Input, StackDivider, Text, VStack } from '@chakra-ui/react'


export default function EmailCredential(){

    return (
        <Flex >
            <VStack
                spacing={4}
                align='stretch'
                minWidth="100%"
            >
                <Box >
                    <Text>Email</Text>
                    <Input placeholder='Enter your email' />
                </Box>
                <Box >
                    <Text>Password</Text>
                    <Input placeholder='********' />
                </Box>

            </VStack>
        </Flex>
    )

}