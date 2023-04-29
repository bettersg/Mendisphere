import {
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IOnChange } from "../profile-page-setup";
import { captureRejectionSymbol } from "events";
import { CapitalGoal } from "../../../data/enums/captial-goal.enum";

export interface IGoalForm {
  capitalNow?: string;
  lastFundedOn?: string;
  capitalGoal?: string;
}

export default function GoalsForm(props: IOnChange) {
  const [goalForm, setGoalForm] = useState<IGoalForm>({});

  useEffect(() => {
    props.onChange(goalForm);
  }, [goalForm])
  
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
              onChange={(e) => setGoalForm({...goalForm, capitalNow: e.target.value})}
            ></Input>
            <FormLabel className="formTitle">
              When was the last time you received funding?
            </FormLabel>
            <Input className="formInput" placeholder="dd/mm/yyyy" onChange={(e) => setGoalForm({...goalForm, lastFundedOn: e.target.value})}></Input>
            <FormLabel className="formTitle">
              What is your capital amount goal?*
            </FormLabel>
            <Select
              required
              className="formInput"
              placeholder="Enter your capital amount goal"
              onChange={(e) => setGoalForm({...goalForm, capitalGoal: e.target.value})}
            >
              {Object.values(CapitalGoal).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
