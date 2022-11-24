import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { AuthRequestData } from '../data/AuthRequestData';
import AuthenticationService from '../services/Authentication';



export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            console.log(`Email: ${username} & Password: ${password}`);
            var data : AuthRequestData = {
                username : username,
            }

            AuthenticationService.authenticate(data)
            .then((response: any) => {console.log(response.data)});
          } catch (error) {
            console.log("Failed login.")
            setUsername('');
            setPassword('');
          }
    }

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Login</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input type="username" placeholder="test1User" onChange={event => setUsername(event.currentTarget.value)} />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="*******" onChange={event => setPassword(event.currentTarget.value)} />
                        </FormControl>
                        <Button width="full" mt={4} type="submit">
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}