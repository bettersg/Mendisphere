import { Box, Flex} from '@chakra-ui/react'

import LoginDesign from "./components/login-design"
import LoginSection from './components/login-section'
import "./scss/login.scss"

export default function LoginPage(){

    return (
        <Flex minH="100vH">
            <Box flex='1'>
                <LoginSection />
            </Box>
            <Box flex='1' className="rounded_edge_rectangle">
                <LoginDesign/>
            </Box>
                
      
        </Flex>

    )

}

 