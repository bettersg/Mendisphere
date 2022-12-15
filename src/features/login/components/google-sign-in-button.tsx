import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { VStack } from '@chakra-ui/react';

function errorHandler(error: string): void{
    console.error(error)
}

function successHandler(response: CredentialResponse): void {
    const clientId = response.clientId;
    const token = response.credential;

    console.log("Received response from google.")
    console.log(`Client ID: ${clientId}`);
    console.log(`Token: ${token}`);
    
    // var authRequest : AuthenticationRequestData = {
    //     userName: token ?? ""
    // }
    
    // try {
    //     AuthenticationService.authenticate(authRequest)
    //     .then((response: any) =>{
    //         console.log(response.data)
    //     })
    // } catch (error) {
    //     console.log("Authentication Failed.")
    // }

    console.log("Login success!")
}

export default function GoogleSignInButton(){
    const  clientConfig = { client_id:'968904403503-qvq5oafbv3ctjtqtf7liqrq04lfou8h4.apps.googleusercontent.com'}

    return (
        <VStack
        spacing={4}
        align='stretch'>
            <GoogleOAuthProvider
                clientId={clientConfig["client_id"]}
            >
                <GoogleLogin
                    onSuccess={(response) => successHandler(response)} 
                    onError={() => errorHandler}
                />

            </GoogleOAuthProvider>
        </VStack>
    )
}