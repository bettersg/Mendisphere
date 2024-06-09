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
import OrgInfoForm from "./OrganisationInfoForm";
import GoalsForm from "./GoalsForm";
import SignUpWaiting from "./SignUpWaiting";
import "./setup.scss";
import { Paths } from "../../routing/Paths";
import { IOrganisation } from "../../data/model/organisation";
import { IOrganisationAdminData } from "../../data/model/organisationAdmin";
import { IOrganisationSummary } from "../../data/model/organisationSummary";

const steps = [
  { label: "Organisation Information" },
  { label: "Expectations & Goals" },
  { label: "Get Started" },
];

export interface IOrgFormData
  extends IOrganisation,
    IOrganisationAdminData,
    IOrganisationSummary {}

export interface OrgDataFormProps {
  orgFormData: IOrgFormData;
  updateOrgFormData: (orgFormData: IOrgFormData) => void;
}

const ProfileSetup = () => {
  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 1,
  });

  const { isOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  // update org data from form inputs
  const [orgFormData, setOrgFormData] = useState<IOrgFormData>({});
  const updateOrgFormData = (payload: IOrgFormData) => {
    setOrgFormData(payload);
  };
  // retrieve the login credentials to be used by the auth provider
  // for sign up
  const { state } = useLocation();

  useEffect(() => {
    if (state === null || !instanceOfLoginCredentials(state)) {
      console.log("No credentials passed. Redirecting to signup");
      navigate(Paths.signup);
    }
  });

  const stepTitle = (activeStep: number) => {
    switch (activeStep) {
      case 1:
        return "Let’s get started! \n Share with us 🙌";
      case 2:
        return "Almost there! \n Tell us your goals 😎";
      default:
        return "Let’s get started! \n Share with us 🙌";
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
                  <OrgInfoForm
                    orgFormData={orgFormData}
                    updateOrgFormData={updateOrgFormData}
                  />
                ) : activeStep === 2 ? (
                  <GoalsForm
                    orgFormData={orgFormData}
                    updateOrgFormData={updateOrgFormData}
                  />
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
                submitData={orgFormData}
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
};

export default ProfileSetup;
