import { Button, VStack } from '@chakra-ui/react'
import React from 'react';

interface LoginCredentials {
    email: string,
    password: string
}

export default function SignInButton(LoginCredentials: LoginCredentials){

    const [isLoading, setLoading] = React.useState(false);
    
    const handleSignIn = () => {
        console.log(`sign in button clicked ${LoginCredentials.email}, ${LoginCredentials.password}`)
    }

    return (
        <VStack
            spacing={4}
            align='stretch'
        >
            <Button colorScheme='blue' isLoading={isLoading} onClick={handleSignIn}>Sign in</Button>
        </VStack>
    )

}