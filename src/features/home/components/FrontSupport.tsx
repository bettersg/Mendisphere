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
  Box,
  Center,
} from "@chakra-ui/react";

export default function FrontSupport() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const customHeadingProps = {
    paddingTop: "10px",
    fontWeight: 400,
    fontSize: "xl",
    textAlign: "center" as const,
  };

  const customButtonProps = {
    width: "100%",
    backgroundColor: "#192873",
    color: "#ffffff",
    "&:hover": {
      bg: "rgba(224, 229, 255, 0)",
      color: "black",
      border: "1px solid #192873",
    },
  };

  return (
    <Box className="page-width page-padding" paddingBottom="100px">
      <Heading
        m="4"
        fontSize={["lg", "2xl", "4xl", "6xl"]}
        textAlign="center"
        fontWeight="bold"
        paddingBottom="100px"
      >
        Support your way
      </Heading>
      <SimpleGrid
        templateColumns={isLargerThan768 ? "repeat(3, 1fr)" : "1fr"}
        gap={4}
      >
        <Card boxShadow="none">
          <CardHeader>
            <Center>
              <Image
                height="185px"
                src={require("../../../assets/images/contribute.png")}
              />
            </Center>
            <Heading style={customHeadingProps}>Contribute</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Browse the wide array of non-profits furthering mental health
              outcomes, understand their story and impact, and contribute to
              those that speak to you.
            </Text>
          </CardBody>
          {/* <CardFooter>
            <Button sx={customButtonProps}>Learn More</Button>
          </CardFooter> */}
        </Card>
        <Card boxShadow="none">
          <CardHeader>
            <Center>
              <Image
                height="185px"
                src={require("../../../assets/images/collaborate.png")}
              />
            </Center>
            <Heading style={customHeadingProps}> Collaborate</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Workshops? Trainings? Talks? Explore opportunities to partner with
              non-profits and leverage their vast expertise in the mental health
              space.
            </Text>
          </CardBody>
          {/* <CardFooter>
            <Button sx={customButtonProps}>Learn More</Button>
          </CardFooter> */}
        </Card>
        <Card boxShadow="none">
          <Center>
            <Image
              height="185px"
              width="auto"
              src={require("../../../assets/images/volunteer.png")}
            />
          </Center>
          <CardHeader>
            <Heading style={customHeadingProps}>Volunteer</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Make your CSR efforts count by volunteering with non-profits who
              need support in achieving their goals.
            </Text>
          </CardBody>
          {/* <CardFooter>
            <Button sx={customButtonProps}>Learn More</Button>
          </CardFooter> */}
        </Card>
      </SimpleGrid>
    </Box>
  );
}
