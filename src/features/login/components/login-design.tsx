import { Center, Spacer, VStack } from '@chakra-ui/react'

export default function LoginDesign(){
    return (
        <VStack>
            <Spacer />
            <Spacer />
            <Center minH="10em"></Center>
           
            <Center minH="10em">
                <img src={require('../../../assets/icons/loginIcon.png')}/>
            </Center>
        </VStack>
    )
}