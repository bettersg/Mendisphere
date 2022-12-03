import { ArrowBackIcon } from '@chakra-ui/icons'
import { Container, Link, StackDivider, Text, VStack } from '@chakra-ui/react'
import LoginForm from './login-form'
import LoginMenuMessage from './login-menu-message'



export default function LoginSection(){

    return (
        <VStack 
        divider={<StackDivider borderColor='#FFFFFF' />}
         spacing={4}
         align="stretch"
        >
            <Container maxW='container.sm' />
                
            <Container maxW='container.sm' >
                <Link href="/"><Text><ArrowBackIcon></ArrowBackIcon>Back</Text></Link>
            </Container>

            <Container minH="10em" maxW='container.sm' />
            
            <Container minH="3em" maxW='container.sm' >
                <LoginMenuMessage />
            </Container>
            
            <Container maxW='container.sm' >
                <LoginForm /> 
            </Container>

        </VStack>
    )
}