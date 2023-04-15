import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instanceOfLoginCredentials } from "../../data/auth/loginCredentials";
import OrgInfoForm, { IOrgInfo } from "./components/org-info-form";
import GoalsForm, { IGoalForm } from "./components/goals-form";
import SignUpWaiting from "./components/sign-up-waiting";
import "./scss/setup.scss";

const steps = [
  { label: "Organisation Information" },
  { label: "Expectations & Goals" },
  { label: "Get Started" },
];

export interface IOnChange {
  onChange: (payload: IOrgInfo | IGoalForm) => void;
}
export interface IOrgData extends IOrgInfo, IGoalForm {

}

export default function ProfileSetupPage() {
  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 1,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const [orgData, setOrgData] = useState<IOrgData>({});
  const updateOrgData = (payload: IOrgInfo | IGoalForm) => {
    Object.entries(payload).forEach(([key, value]) => {
      setOrgData({...orgData, [key]: value})
    })
  }
  console.log('orgData', orgData)
  // retrieve the login credentials to be used by the auth provider
  // for sign up
  const { state } = useLocation();

  useEffect(() => {
    if (state === null || !instanceOfLoginCredentials(state)) {
      console.log("No credentials passed. Redirecting to signup");
      navigate("/registration");
    }
  });

  const stepTitle = (activeStep: number) => {
    console.log(activeStep);
    switch (activeStep) {
      case 1:
        return "Let’s get started! \n Share with us 🙌";
        break;
      case 2:
        return "Almost there! \n Tell us your goals 😎";
        break;
      default:
        return "Let’s get started! \n Share with us 🙌";
        break;
    }
  };

  const displayDisclaimer = () => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center minH="10em">
                <Image src="/images/disclaimer.png"></Image>
              </Center>
              Having your profile incomplete will{" "}
              <strong>
                result in placeholder information and limit your access to
                resources.{" "}
              </strong>{" "}
              We recommend that you complete your profile set up now, however,
              we understand that you might be busy. So feel free to continue at
              a later time if it is more convenient.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const onClickNext = () => {};

  return (
    <VStack
      divider={<StackDivider borderColor="#D3D3D3" />}
      spacing={4}
      align="stretch"
    >
      <Container maxW="1024">
        <form>
          <Flex
            className="setupHeader"
            flexDir="row"
            minWidth="max-content"
            alignItems="center"
            gap="200"
          >
            <Heading className="setupHeading">Mindbetter</Heading>
            <form></form>
            <Steps
              colorScheme="blue"
              onClickStep={(step) => {
                return setStep(step + 1);
              }}
              activeStep={activeStep}
              size="sm"
            >
              {steps.map(({ label }) => (
                <Step label={label} key={label}></Step>
              ))}
            </Steps>
          </Flex>
          <Spacer />
          {activeStep !== steps.length ? (
            <VStack className="formSize">
              {/* Stepper Title */}
              <Flex w="100%"></Flex>

              {/* Stepper Forms */}
              <Flex w="100%" flexDir="column">
                <Heading className="stepTitle" style={{ width: "30%" }}>
                  {stepTitle(activeStep)}
                </Heading>
                {activeStep === 1 ? (
                  <OrgInfoForm onChange={updateOrgData} />
                ) : activeStep === 2 ? (
                  <GoalsForm onChange={updateOrgData} />
                ) : (
                  ""
                )}
              </Flex>
            </VStack>
          ) : (
            <VStack className="formSize">
              <SignUpWaiting
                email={state.email}
                password={state.password}
                validated={state.validated}
                submitData={orgData}
              />
            </VStack>
          )}
          {/* Stepper buttons */}
          <Flex w="100%" justify="flex-end">
            <ButtonGroup gap="2">
              <Button
                className="backButton"
                onClick={
                  activeStep === 1
                    ? () => {
                        displayDisclaimer();
                      }
                    : prevStep
                }
              >
                Continue Later
              </Button>
              <Button
                className="nextButton"
                onClick={activeStep === 3 ? onClickNext : nextStep}
              >
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </form>
      </Container>
    </VStack>
  );
}
