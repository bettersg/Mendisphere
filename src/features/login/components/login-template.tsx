import { Box, Button, Container, Flex, Link, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react'

import {ArrowBackIcon} from '@chakra-ui/icons'

import EmailCredential from "./email-credential"
import LoginMenuMessage from './login-menu-message'
import LoginDesign from "./login-design"

import "./../scss/login.scss"

export default function Login(){

    return (
        <Flex minH="100vH">
            <Box flex='1'>
                <VStack 
                     divider={<StackDivider borderColor='#FFFFFF' />}
                     spacing={4}
                     align="stretch"
                >
                    <Container maxW='container.sm' >
                         
                    </Container>

                    <Container maxW='container.sm' >
                        <Link href="/"><Text><ArrowBackIcon></ArrowBackIcon>Back</Text></Link>
                    </Container>


                    <Container minH="10em" maxW='container.sm' >
                      
                    </Container>
                    
                    <Container minH="3em" maxW='container.sm' >
                        <LoginMenuMessage />
                    </Container>
                    
                    <Container maxW='container.sm' >
                        <EmailCredential />
                    </Container>

                    <Container maxW='container.sm' >
                        <Flex >
                            <Box p='1'></Box>
                            <Spacer />
                            <Box p='1' >
                                <Link href="/"><Text color="blue" as='b'>Forgot password</Text></Link>
                            </Box>
                        </Flex>
                        <VStack
                            spacing={4}
                            align='stretch'
                            minWidth="100%"
                        >
                                <Button colorScheme='blue'>Sign in</Button>
                        </VStack>
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
                    </Container>

                </VStack>
            </Box>
            <Box flex='1' className="rounded_edge_rectangle">
                <LoginDesign/>
            </Box>
                
      
        </Flex>

    )

}

