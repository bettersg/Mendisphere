import { Flex, Center, VStack, StackDivider, Divider, Spacer, Box, Text } from "@chakra-ui/react";

import { Component } from "react";


class Footer extends Component{


    constructor(props:any){
        super(props);
        
        

    }


    //TODO: Need to add another lifecycle method to prevent double requests in react
    
    render(){
        return (
            <Flex bg={"#F5F5F5"}>
                <Center minW="8.55vw" minH="37.33vh" />
                <Box minW="82.2vw" minH="37.33vh">
                    <VStack 
                        divider={<StackDivider borderColor='whiteAlpha.200' />}
                        spacing={0}
                        align='stretch'
                    >
                        <Box w="82.2vw" h="4.6vh" />

                        <Box w="82.2vw">
                            <Text
                                fontFamily={"Inter"}
                                fontStyle={"normal"}
                                fontWeight={"700"}
                                fontSize={"32px"}
                                lineHeight={"39px"}
                                letterSpacing={"-0.015em"}
                                color={"#3959FF"}
                            >
                                Mindbetter
                            </Text>

                        </Box>

                        <Box w="82.2vw" h="2.77vh" />
                        
                        <Box w="82.2vw" >
                            <Text 
                                fontFamily={"Inter"}
                                fontStyle={"normal"}
                                fontWeight={"400"}
                                fontSize={"18px"}
                                lineHeight={"27px"}
                                letterSpacing={"-0.015em"}
                            >
                                Providing you with the support to make your mark.
                            </Text>
                            <Text
                                fontFamily={"Inter"}
                                fontStyle={"normal"}
                                fontWeight={"400"}
                                fontSize={"18px"}
                                lineHeight={"27px"}
                                letterSpacing={"-0.015em"}
                            >
                                Together, let's make the world a better place.
                            </Text>
                        </Box>

                        <Box w="82.2vw" h="3.77vh"></Box>

                        <Divider colorScheme={'blue'} orientation={'horizontal'} />

                        <Box w="82.2vw" h="2.77vh"></Box>

                        
                            <Flex w="82.2vw">
                                <Box > 
                                    <Flex>
                                        <Text
                                            fontFamily={"Inter"}
                                            fontStyle={"normal"}
                                            fontWeight={"700"}
                                            fontSize={"24px"}
                                            lineHeight={"29px"}
                                            letterSpacing={"-0.015em"}
                                        >

                                            Organisations 
                                        </Text>
                                        <Box w="4.166vw"></Box>

                                        <Text
                                            fontFamily={"Inter"}
                                            fontStyle={"normal"}
                                            fontWeight={"700"}
                                            fontSize={"24px"}
                                            lineHeight={"29px"}
                                            letterSpacing={"-0.015em"}
                                        >
                                            Get resources
                                        </Text>   
                                    </Flex>
                                </Box> 
                                <Box minW="40vw"> </Box>
                                <Box>
                                    <Flex>
                                        <Text
                                            fontFamily={"Inter"}
                                            fontStyle={"normal"}
                                            fontWeight={"400"}
                                            fontSize={"18px"}
                                            lineHeight={"22px"}
                                            textAlign={"center"}
                                            letterSpacing={"-0.015em"}
                                        >
                                            About 
                                        </Text>
                                        <Box w="4.166vw"></Box>

                                        <Text
                                            fontFamily={"Inter"}
                                            fontStyle={"normal"}
                                            fontWeight={"400"}
                                            fontSize={"18px"}
                                            lineHeight={"22px"}
                                            textAlign={"center"}
                                            letterSpacing={"-0.015em"}
                                        >
                                            Contact
                                        </Text>

                                        <Box w="4.166vw"></Box>
                                        
                                        <Text
                                            fontFamily={"Inter"}
                                            fontStyle={"normal"}
                                            fontWeight={"400"}
                                            fontSize={"18px"}
                                            lineHeight={"22px"}
                                            textAlign={"center"}
                                            letterSpacing={"-0.015em"}
                                        >
                                            FAQ
                                        </Text>   
                                    </Flex>

                                </Box> 
                            </Flex>

                        
                        <Box w="82.2vw" h="3.33vh" />
                        
                        <Box w="82.2vw">
                            <Text
                                fontFamily={"Inter"}
                                fontStyle={"normal"}
                                fontWeight={"400"}
                                fontSize={"14px"}
                                lineHeight={"17px"}
                                letterSpacing={"-0.015em"}
                                color={"#707070"}                         
                            >
                                © 2022 Mindbetter. All Rights Reserved.
                            </Text>

                        </Box>

                        <Box w="82.2vw" h="2vh" />
                    </VStack>
                </Box>
                <Center minW="8.55vw" minH="37.33vh" />
            </Flex>
        )
    }

}

export default Footer;
