import {
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { OrgDataFormProps } from "./profileSetup";
import {
  CapitalGoal,
  capitalGoalEnumOptions,
} from "../../data/enums/captial-goal.enum";

const GoalsForm = ({ orgFormData, updateOrgFormData }: OrgDataFormProps) => {
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
      w="100%"
      gap="120px"
    >
      <GridItem colSpan={1}>
        <Text className="formHeading">Expectations & Goals</Text>
        <Text className="formDescription">
          To help you measure the impact of joining Mindbetter, please tell us
          more about your organisation’s expectations and goals!
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Grid w="100%" templateColumns="repeat(3, 1fr)" gap="24px">
          <GridItem colSpan={3}>
            <FormLabel className="formTitle">
              How much capital have you raised? (incl. grants & external funds)
            </FormLabel>
            <Input
              className="formInput"
              placeholder="Enter how much capital your organisation has raised"
              onChange={(e) =>
                updateOrgFormData({
                  ...orgFormData,
                  capitalCurrent: e.target.value,
                })
              }
            ></Input>
            <FormLabel className="formTitle">
              When was the last time you received funding?
            </FormLabel>
            <Input
              className="formInput"
              type="date"
              onChange={(e) =>
                updateOrgFormData({
                  ...orgFormData,
                  lastFundingDate: new Date(e.target.value),
                })
              }
            ></Input>
            <FormLabel className="formTitle">
              What is your capital amount goal?*
            </FormLabel>
            <Select
              required
              className="formInput"
              isRequired={true}
              placeholder="Enter your capital amount goal"
              onChange={(e) =>
                updateOrgFormData({
                  ...orgFormData,
                  capitalGoal: e.target.value as CapitalGoal,
                })
              }
            >
              {capitalGoalEnumOptions.map((enumOption) => (
                <option key={enumOption.key} value={enumOption.key}>
                  {enumOption.value}
                </option>
              ))}
            </Select>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default GoalsForm;
