import {Box, Flex, StackDivider, VStack} from '@chakra-ui/react'
import Footer from './components/Footer';
import FrontPage from './components/FrontPage';
import NavigationBar from './components/NavigationBar';

export default function Landing(){

    return (
        <VStack
            spacing={0}
            align='stretch'
        >
            <Box minH="10vh" >
                <NavigationBar />
            </Box>
            <Box minH='88.5vh'>
                <FrontPage />
            </Box>
            <Box h='81.3vh' bg='pink.100'>
                Get connected to what matters most.
            </Box>
            <Box h='100vh' bg='blue.100'>
                Hear their stories!
            </Box>
            <Box h='81.6vh' bg='green.100'>
                How does MindBetter work?
            </Box>
            <Box h='54.7vh' bg='blue.100'>
                Go faster, together
            </Box>
            <Box h='24.1vh'>
                <Footer />
            </Box>
        </VStack>
    );
}
