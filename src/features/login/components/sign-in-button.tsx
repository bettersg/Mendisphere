import { Button, VStack } from '@chakra-ui/react'
import { User, UserCredential } from 'firebase/auth';
import React from 'react';
import { AuthenticationRequestData } from '../../../data/auth/authRequestData';
import AuthenticationService from '../../../services/authentication';
import { useAuth } from '../../../services/firebase/authProvider';

interface LoginCredentials {
    email: string,
    password: string
}

export default function SignInButton(LoginCredentials: LoginCredentials){

    const [isLoading, setLoading] = React.useState(false);
    const {signIn} = useAuth();
    const authRequest : AuthenticationRequestData = {
        userName: ""
    }
    
    const handleSignIn = async () => {
        console.log(`sign in button clicked ${LoginCredentials.email}, ${LoginCredentials.password}`)
        try{
            setLoading(true);
            let userCred: UserCredential = await signIn(LoginCredentials.email, LoginCredentials.password);
            let user: User = userCred.user
            let token: string = await user.getIdToken();
            console.log(`Authentication success userid: ${user.uid}, ${token}`);
            authRequest.userName = user.uid;
            console.log(`Authenticating with MindBetter backend...`);
            AuthenticationService.authenticate(authRequest)
            .then((response: any) =>{
                console.log(response.data)
            })
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