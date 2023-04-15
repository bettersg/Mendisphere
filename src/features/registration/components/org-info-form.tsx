import {
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Spacer,
  Text,
  Image,
} from "@chakra-ui/react";

export default function OrgInfoForm() {
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
      w="100%"
      gap="10px"
    >
      <GridItem colSpan={1}>
        <Text className="formHeading">
          <strong>Organisation Information</strong>
        </Text>
        <Text className="formDescription">
          Information about your organisation. This will be displayed on your
          organisation profile.
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Grid
          w="100%"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap="2rem"
        >
          <GridItem colSpan={1}>
            <FormLabel className="formTitle">Name of Organisation*</FormLabel>
            <Input
              className="formInput"
              placeholder="Enter your organisation name"
            ></Input>
          </GridItem>
          <GridItem colSpan={2}>
            <FormLabel className="formTitle">Registered Address*</FormLabel>
            <Input
              className="formInput"
              placeholder="Enter your organisation address here"
            ></Input>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <FormLabel className="formTitle">
              What Does Your Organisation Focus On?*
            </FormLabel>
            <Select className="formSelect" placeholder="Focus Areas">
              <option value="Area1">Area 1</option>
              <option value="Area2">Area 2</option>
              <option value="Area3">Area 3</option>
            </Select>
          </GridItem>
          <GridItem colSpan={2} rowSpan={1}>
            <FormLabel className="formTitle">
              What Do You Need Help with most? (max 3)*
            </FormLabel>
            <Select
              className="formSelect"
              placeholder="What Are You Looking For?"
            >
              <option value="Area1">Area 1</option>
              <option value="Area2">Area 2</option>
              <option value="Area3">Area 3</option>
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel className="formTitle">Website</FormLabel>
            <Input
              className="formInput"
              placeholder="Enter Your Website URL"
            ></Input>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel className="formTitle">
              Organisation start date*
            </FormLabel>
            <Input className="formInput" placeholder="DD/MM/YYYY"></Input>
          </GridItem>
          <GridItem colSpan={2}>
            <FormLabel className="formTitle">
              Your role in your organsation*
            </FormLabel>
            <Select
              className="formSelect"
              placeholder="Select a role (e.g. Founder)"
            >
              <option value="Founder">Founder</option>
              <option value="Executive">Executive</option>
              <option value="Staff">Staff</option>
            </Select>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem colSpan={1}>
        <Text className="formHeading">
          <strong>Administrative Information</strong>
        </Text>
        <Text className="formDescription">
          Administrative information about your organisation wiil help us to
          verify your account faster and allow you access to resources.
        </Text>

        <Image src="/images/org-info.png" />
      </GridItem>
      <GridItem colSpan={2}>
        <Grid
          w="100%"
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap="2rem"
        >
          <GridItem colSpan={1}>
            <FormLabel className="formTitle">UEN*</FormLabel>
            <Input className="formInput" placeholder="T12345678E"></Input>
          </GridItem>
          <GridItem colSpan={2} rowSpan={1}>
            <FormLabel className="formTitle">
              How many people in your organisation*
            </FormLabel>
            <Select className="formSelect">
              <option value="1-10">1-10</option>
              <option value="100">100</option>
              <option value="1000">1000</option>
              <option value="1000+">1000+</option>
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel className="formTitle">
              IPC registration expiry date (if applicable)
            </FormLabel>
            <Input className="formInput" placeholder="DD/MM/YYYY"></Input>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
