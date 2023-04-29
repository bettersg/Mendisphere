import {
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IOnChange } from "../profile-setup-page";
import { Specialisation } from "../../../data/enums/specialisation.enum";
import { SupportArea } from "../../../data/enums/support-area.enum";
import { Service } from "../../../data/enums/service.enum";
import { OrgSize } from "../../../data/enums/org-size.enum";

export interface IOrgInfo {
  orgName?: string;
  address?: string;
  focusArea?: string; // TODO multi-select?
  helpArea?: string; // TODO multi-select?
  website?: string;
  startDate?: string;
  role?: string;
  uen?: string;
  orgSize?: string;
  ipcExpiryDate?: string;
}

export default function OrgInfoForm(props: IOnChange) {
  const [orgInfo, setOrgInfo] = useState<IOrgInfo>({});

  useEffect(() => {
    props.onChange(orgInfo);
  }, [orgInfo]);

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
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, orgName: e.target.value })
              }
            ></Input>
          </GridItem>
          <GridItem colSpan={2}>
            <FormLabel className="formTitle">Registered Address*</FormLabel>
            <Input
              className="formInput"
              placeholder="Enter your organisation address here"
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, address: e.target.value })
              }
            ></Input>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <FormLabel className="formTitle">
              What does your organisation specialise in?*
            </FormLabel>
            <Select
              className="formSelect"
              placeholder="Choose a specialisation"
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, focusArea: e.target.value })
              }
            >
              {Object.values(Specialisation).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={2} rowSpan={1}>
            <FormLabel className="formTitle">
              What Do You Need Help with most?*
            </FormLabel>
            <Select
              className="formSelect"
              placeholder="Requests"
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, helpArea: e.target.value })
              }
            >
              {Object.values(SupportArea).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <FormLabel className="formTitle">
              What services do you provide?*
            </FormLabel>
            <Select
              className="formSelect"
              placeholder="Services"
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, helpArea: e.target.value })
              }
            >
              {Object.values(Service).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={2} rowSpan={1}>
            <FormLabel className="formTitle">Website</FormLabel>
            <Input
              className="formInput"
              placeholder="Enter Your Website URL"
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, website: e.target.value })
              }
            ></Input>
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
            <Input
              className="formInput"
              placeholder="T12345678E"
              onChange={(e) => setOrgInfo({ ...orgInfo, uen: e.target.value })}
            ></Input>
          </GridItem>
          <GridItem colSpan={2} rowSpan={1}>
            <FormLabel className="formTitle">
              How many people are in your organisation?*
            </FormLabel>
            <Select
              className="formSelect"
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, orgSize: e.target.value })
              }
            >
              {Object.values(OrgSize).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel className="formTitle">
              IPC registration expiry date (if applicable)
            </FormLabel>
            <Input
              className="formInput"
              placeholder="DD/MM/YYYY"
              onChange={(e) =>
                setOrgInfo({ ...orgInfo, ipcExpiryDate: e.target.value })
              }
            ></Input>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
