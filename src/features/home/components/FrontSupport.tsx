import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  VStack,
  Text,
  SimpleGrid,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";

export default function FrontSupport() {
  return (
    <Card p="4" m="4">
      <CardHeader fontSize="3xl" textAlign="center">Support Your Way</CardHeader>
      <SimpleGrid templateColumns='repeat(3, 1fr)' gap={6}>
        <Card>
          <CardHeader>
            <Heading size="md" textAlign="center">Contribute</Heading>
          </CardHeader>
          <CardBody>
            <Text>Browse the wide array of non-profits furthering mental health outcomes, understand their story and impact, and contribute to those that speak to you.</Text>
          </CardBody>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md" textAlign="center"> Collaborate</Heading>
          </CardHeader>
          <CardBody>
            <Text>Workshops? Trainings? Talks? Explore opportunities to partner with non-profits and leverage their vast expertise in the mental health space.</Text>
          </CardBody>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md" textAlign="center">Volunteer</Heading>
          </CardHeader>
          <CardBody>
            <Text>Make your CSR efforts count by volunteering with non-profits who need support in achieving their goals.</Text>
          </CardBody>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Card>
  );
}
