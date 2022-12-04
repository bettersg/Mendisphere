import {Box, Flex, VStack, StackDivider, Link, Center, ButtonGroup, Button} from '@chakra-ui/react'

export default function NavigationBar(){

    return (
        <VStack
        divider={<StackDivider borderColor='whiteAlpha.200' />}
        spacing={0}
        align='stretch'
        >
            <Center h='3vh'/>
            <Center h='6vh' >
                <Flex minWidth="max-content">
                        <Center  w="8.8vw" h="6vh" />

                    <Center p='4' w="9vw" h="6vh" >
                        Logo Here
                    </Center>

                        <Center w="14.9vw" h="6vh" />

                    <Center w="30vw" h="6vh">
                        <Flex>
                            <Center w="9vw" h="6vh">
                                <Link 
                                    fontFamily={"Inter"}
                                    fontSize='12px'
                                
                                >
                                    Organisations
                                </Link>
                            </Center>
                            <Center w="9vw" h="6vh">
                                <Link
                                     fontFamily={"Inter"}
                                     fontSize='12px'    
                                >
                                    Apply for Services
                                </Link>
                            </Center>
                            <Center w="9vw" h="6vh">
                                <Link
                                     fontFamily={"Inter"}
                                     fontSize='12px'
                                     lineHeight='1.2'
                                >
                                    Contact Us
                                </Link>
                            </Center>
                        </Flex>    
        
                    </Center>

                    <Center w="14.9vw" h="6vh"/>

                    <Center w="19.3vw" h="6vh">
                        <Box
                            as='button'
                            fontFamily={"Inter"}
                            height='6vh'
                            width="9vw"
                            lineHeight='1.2'
                            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                            border='1px'
                            px='8px'
                            borderRadius='2px'
                            fontSize='12px'
                            fontWeight='semibold'
                            bg='#ffffff'
                            borderColor='#ccd0d5'
                            color='#4b4f56'
                            _hover={{ bg: '#ebedf0' }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                            _focus={{
                                boxShadow:
                                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                        >
                            Log in
                        </Box>
                        <Center w="1.2vw" h="6vh"/>        

                        <Box
                            as='button'
                            fontFamily={"Inter"}
                            height='6vh'
                            width="9vw"
                            lineHeight='1.2'
                            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                            border='1px'
                            px='8px'
                            borderRadius='2px'
                            fontSize='12px'
                            fontWeight='semibold'
                            bg='#192873'
                            borderColor='#ccd0d5'
                            color='#ffffff'
                            _hover={{ bg: '#ebedf0' }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                            _focus={{
                                boxShadow:
                                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                        >
                            Sign up
                        </Box>
                        
                    </Center>

                    <Center  w="8.8vw" h="6vh" />
                </Flex>
            </Center>
            <Center h='3vh' />
        </VStack>
    );
}