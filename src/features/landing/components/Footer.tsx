import {Box, Center, Divider, Flex, Spacer, StackDivider, VStack} from '@chakra-ui/react'


export default function Footer(){

    return (
        <Flex minWidth="max-content">
            <Center w="8.8vw" h="24.1vh" />
            <Box w="82.2vw" h="24.1vh">
                <VStack 
                    divider={<StackDivider borderColor='whiteAlpha.200' />}
                    spacing={0}
                    align='stretch'
                >
                    <Box w="82.2vw" h="3vh" />

                    <Box w="82.2vw" h="5vh">
                        <Flex w="82.2vw">
                            
                            <Box w="18vw" h="5vh" backgroundColor={'#FFFFFF'}>
                                asdasd
                            </Box>
                            <Box w="18vw" h="5vh" backgroundColor={"#0FF00D"}>
                                Slogan Slogan Slogan
                            </Box>
                        </Flex>

                    </Box>

                    <Box w="82.2vw" h="2vh" />
                    
                    <Divider colorScheme={'blue'} orientation={'horizontal'} />
                    
                    <Box w="82.2vw" h="2vh" />

                    <Box w="82.2vw" h="3vh" >
                        <Flex>
                            <Box > 
                                Organisations Get resources
                            </Box> 
                            <Spacer />
                            <Spacer />
                            <Box>
                                FAQ About Contact Us
                            </Box> 
                        </Flex>

                    </Box>
                    <Box w="82.2vw" h="3vh" />
                    
                    <Box w="82.2vw" h="3vh" >
                            <Box > 
                                Copyright  MindBetter
                            </Box> 
                            <Spacer />

                    </Box>

                    <Box w="82.2vw" h="2vh" />
                </VStack>
            </Box>
            <Center w="8.8vw" h="24.1vh" />
        </Flex>
    )
}