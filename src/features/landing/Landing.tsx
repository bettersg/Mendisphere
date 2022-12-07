import {Box, Flex, StackDivider, VStack} from '@chakra-ui/react'
import NavigationBar from './components/NavigationBar';

export default function Landing(){

    return (
        <VStack
            spacing={0}
            align='stretch'
        >
            <Box minH="12.5vh" >
                <NavigationBar />
            </Box>
            <Box h='87.5vh' bg='blue'>
                Expand your impact with Mindbetter
            </Box>
            <Box h='100vh' bg='pink.100'>
                Get connected to what matters most.
            </Box>
            <Box h='100vh' bg='pink.100'>
                Hear their stories!
            </Box>
            <Box h='100vh' bg='green.100'>
                How does MindBetter work?
            </Box>
            <Box h='67vh' bg='blue.100'>
                Go faster, together
            </Box>
            <Box h='29.6vh' bg='pink.100'>
                Footer
            </Box>
        </VStack>
    );
}
