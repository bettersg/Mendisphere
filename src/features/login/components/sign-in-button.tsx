import { Button, VStack } from '@chakra-ui/react'
import React from 'react';
import { useAuth } from '../../../services/firebase/authProvider';

interface LoginCredentials {
    email: string,
    password: string
}

export default function SignInButton(LoginCredentials: LoginCredentials){

    const [isLoading, setLoading] = React.useState(false);
    const {signIn} = useAuth();
    
    const handleSignIn = async () => {
        console.log(`sign in button clicked ${LoginCredentials.email}, ${LoginCredentials.password}`)
        try{
            setLoading(true);
            await signIn(LoginCredentials.email, LoginCredentials.password);
            console.log("Authentication success");
        } catch(error: unknown) {
            let errorMessage = 'error.unknown';
            if (typeof error === 'string') {
                errorMessage = error.toUpperCase()
              } else if (error instanceof Error) {
                errorMessage = error.message
              }

            console.log(`Authentication failed ${errorMessage}`);
        }
        setLoading(false);
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