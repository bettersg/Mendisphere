import {Flex, VStack, StackDivider, Link, Center} from '@chakra-ui/react'
import NavigationButton from './NavigationButton';

export default function NavigationBar(){
    return (
        <VStack
        divider={<StackDivider borderColor='whiteAlpha.200' />}
        spacing={0}
        align='stretch'

        h="10vh"
        >
            <Center h='2.5vh'/>
            <Center h='5vh' >
                <Flex minWidth="max-content">
                    <Center w="8.8vw" h="5vh" />

                    <Center p='4' w="9vw" h="5vh" >
                        Logo Here
                    </Center>

                        <Center w="14.9vw" h="5vh" />

                    <Center w="30vw" h="5vh">
                        <Flex>
                            <Center w="9vw" h="5vh">
                                <Link 
                                    fontFamily={"Inter"}
                                    fontSize='12px'
                                >
                                    Organisations
                                </Link>
                            </Center>
                            <Center w="9vw" h="5vh">
                                <Link
                                     fontFamily={"Inter"}
                                     fontSize='12px'    
                                >
                                    Apply for Services
                                </Link>
                            </Center>
                            <Center w="9vw" h="5vh">
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

                    <Center w="14.9vw" h="5vh"/>

                    <Center w="19.3vw" h="5vh">

                            <NavigationButton navigationLink="/login" buttonText="Log in" />

                        <Center w="1.2vw" h="5vh"/>        
                            
                            <NavigationButton  navigationLink="" buttonText="Sign up" />
                           
                    </Center>

                    <Center w="8.8vw" h="5vh" />
                </Flex>
            </Center>
            <Center h='2.5vh' />
        </VStack>
    );

}