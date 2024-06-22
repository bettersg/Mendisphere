import {
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Image,
} from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";
import { OrgDataFormProps } from "./profileSetup";
import {
  Specialisation,
  specialisationEnumOptions,
} from "../../data/enums/specialisation.enum";
import {
  SupportArea,
  supportAreaEnumOptions,
} from "../../data/enums/support-area.enum";
import {
  ServiceEnumOption,
  serviceEnumOptions,
} from "../../data/enums/service.enum";
import { OrgSize, orgSizeEnumOptions } from "../../data/enums/org-size.enum";
import { useState } from "react";

const OrganisationInfoForm = ({
  orgFormData,
  updateOrgFormData,
}: OrgDataFormProps) => {
  const [services, setServices] = useState<ServiceEnumOption[]>([]);

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
              isRequired={true}
              placeholder="Enter your organisation name"
              onChange={(e) =>
                updateOrgFormData({ ...orgFormData, name: e.target.value })
              }
            ></Input>
          </GridItem>
          <GridItem colSpan={2}>
            <FormLabel className="formTitle">Registered Address*</FormLabel>
            <Input
              className="formInput"
              isRequired={true}
              placeholder="Enter your organisation address here"
              onChange={(e) =>
                updateOrgFormData({ ...orgFormData, address: e.target.value })
              }
            ></Input>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <FormLabel className="formTitle">
              What does your organisation specialise in?*
            </FormLabel>
            <Select
              className="formSelect"
              isRequired={true}
              placeholder="Choose a specialisation"
              onChange={(e) =>
                updateOrgFormData({
                  ...orgFormData,
                  mainSpecialisation: e.target.value as Specialisation,
                })
              }
            >
              {specialisationEnumOptions.map((enumOption) => (
                <option key={enumOption.key} value={enumOption.key}>
                  {enumOption.value}
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
              isRequired={true}
              placeholder="Requests"
              onChange={(e) =>
                updateOrgFormData({
                  ...orgFormData,
                  mainSupportArea: e.target.value as SupportArea,
                })
              }
            >
              {supportAreaEnumOptions.map((enumOption) => (
                <option key={enumOption.key} value={enumOption.key}>
                  {enumOption.value}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <FormLabel className="formTitle">
              What services do you provide?*
            </FormLabel>
            <MultiSelect
              className="formSelect"
              options={serviceEnumOptions}
              labelledBy="Services"
              onChange={(e: ServiceEnumOption[]) => {
                updateOrgFormData({
                  ...orgFormData,
                  services: e.map((option) => option.value),
                });
                setServices(e);
              }}
              value={services}
            />
          </GridItem>
          <GridItem colSpan={2} rowSpan={1}>
            <FormLabel className="formTitle">Website</FormLabel>
            <Input
              className="formInput"
              placeholder="Enter Your Website URL"
              onChange={(e) =>
                updateOrgFormData({
                  ...orgFormData,
                  websiteUrl: e.target.value,
                })
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
              onChange={(e) =>
                updateOrgFormData({ ...orgFormData, uen: e.target.value })
              }
            ></Input>
          </GridItem>
          <GridItem colSpan={2} rowSpan={1}>
            <FormLabel className="formTitle">
              How many people are in your organisation?*
            </FormLabel>
            <Select
              className="formSelect"
              isRequired={true}
              onChange={(e) =>
                updateOrgFormData({
                  ...orgFormData,
                  size: e.target.value as OrgSize,
                })
              }
            >
              {orgSizeEnumOptions.map((enumOption) => (
                <option key={enumOption.key} value={enumOption.key}>
                  {enumOption.value}
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
              type="date"
              onChange={(e) => {
                updateOrgFormData({
                  ...orgFormData,
                  ipcExpiry: new Date(e.target.value),
                });
              }}
            ></Input>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default OrganisationInfoForm;
