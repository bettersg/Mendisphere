import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  SimpleGrid,
  Button,
  Heading,
  Image,
  AspectRatio,
  useMediaQuery,
} from "@chakra-ui/react";

export default function FrontSupport() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Card
      p="4"
      m="4"
      variant="unstyled"
      bgGradient="linear(to-t, #E0E5FF, white)"
    >
      <CardHeader
        m="4"
        fontSize={["lg", "2xl", "4xl", "6xl"]}
        textAlign="center"
        fontWeight="bold"
      >
        Support Your Way
      </CardHeader>
      <SimpleGrid
        templateColumns={isLargerThan768 ? "repeat(3, 1fr)" : "1fr"}
        gap={4}
      >
        <Card>
          <CardHeader>
            <AspectRatio h="300px" ratio={3 / 3}>
              <Image
                boxSize="150px"
                objectFit="fill"
                src={require("../../../assets/images/3dgirlwithcoins.png")}
              />
            </AspectRatio>
            <Heading size="md" textAlign="center">
              Contribute
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Browse the wide array of non-profits furthering mental health
              outcomes, understand their story and impact, and contribute to
              those that speak to you.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <AspectRatio maxH="300px" ratio={3 / 3}>
              <Image
                objectFit="cover"
                src={require("../../../assets/images/3dgirlcollab.png")}
              />
            </AspectRatio>
            <Heading size="md" textAlign="center">
              {" "}
              Collaborate
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Workshops? Trainings? Talks? Explore opportunities to partner with
              non-profits and leverage their vast expertise in the mental health
              space.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>
        <Card>
          <AspectRatio h="300px" ratio={3 / 3}>
            <Image
              boxSize="150px"
              objectFit="fill"
              src={require("../../../assets/images/3dgirlhand.png")}
            />
          </AspectRatio>
          <CardHeader>
            <Heading size="md" textAlign="center">
              Volunteer
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Make your CSR efforts count by volunteering with non-profits who
              need support in achieving their goals.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Card>
  );
}
