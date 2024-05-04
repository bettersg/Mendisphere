import { CheckCircleIcon } from "@chakra-ui/icons";
import { Center, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { User, UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Firebase/AuthProvider";
import { IOrgFormData } from "./ProfileSetup";
import {
  IOrganisation,
  createOrganisationOnSignUp,
} from "../../data/Model/Organisation";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { IOrganisationAdminData } from "../../data/Model/OrganisationAdmin";
import { IOrganisationSummary } from "../../data/Model/OrganisationSummary";
import { UserRole } from "../../data/Enums/user-role.enum";
import { createUser } from "../../data/Model/User";

export interface LoginCredentials {
  email: string;
  password: string;
  validated: boolean;
  submitData?: IOrgFormData;
}

const SignUpWaiting = (loginCredentials: LoginCredentials) => {
  const [isLoading, setLoading] = useState(true);
  const { signUp } = useAuth();
  const { email, password, validated, submitData } = loginCredentials || {};
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const navigate = useNavigate();
  const handleSignIn = async () => {
    console.log(`Sign up request sent ${email}`);
    try {
      setLoading(true);
      let userCred: UserCredential = await signUp(email, password);

      if (userCred.user == null) {
        throw Error("Unable to create user!");
      }

      const user: User = userCred.user;
      const token: string = await user.getIdToken();
      if (submitData != null) {
        const orgData: IOrganisation = {
          name: submitData.name,
          ipcApproved: IPCStatus.Pending,
          verified: VerificationStatus.Pending,
          mainSpecialisation: submitData.mainSpecialisation,
          mainSupportArea: submitData.mainSupportArea,
          services: submitData.services,
          description: "",
          cardImageUrl: "",
        };

        const orgAdminData: IOrganisationAdminData = {
          address: submitData.address,
          size: submitData.size,
          capitalCurrent: submitData.capitalCurrent,
          capitalGoal: submitData.capitalGoal,
          lastFundingDate: submitData.lastFundingDate,
          ipcExpiry: submitData.ipcExpiry,
          uen: submitData.uen ?? "",
        };

        const orgSummaryData: IOrganisationSummary = {
          websiteUrl: submitData.websiteUrl,
        };

        const orgId = await createOrganisationOnSignUp(
          orgData,
          orgAdminData,
          orgSummaryData
        );
        await createUser(token, orgId, UserRole.admin);
      }

      console.log("submitData", submitData);
      console.log(`Authentication success userid: ${user.uid}, ${token}`);
      setLoading(false);
      console.log("Routing to user dashboard page.");
      await delay(2000);
      navigate("/dashboard");
    } catch (error: unknown) {
      let errorMessage = "error.unknown";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.log(`Sign Up failed ${errorMessage}`);

      // TODO Create alert and navigate to sign up page.\\
    }
  };

  useEffect(() => {
    if (!validated) {
      console.log(
        "Login credentials are not validated. Redirecting to sign up."
      );
      // TODO created alert and redirect to sign up page if login credentials are not valid
    }

    handleSignIn();
  });

  return (
    <Center>
      <VStack>
        <Image src="/images/get-started.png" />
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <CheckCircleIcon w={8} h={8} color="green.500" />
        )}
        <Text className="loadingTitle">Welcome, {email.split("@", 1)}! 👋🏻</Text>
        <Text className="loadingSubTitle">
          We’re setting up your profile right now. This will take just a second!
        </Text>
        <Text className="loadingInfo">
          Do you know that there are over 2000 charitable organisations in
          Singapore? Last year, registered charities attracted approximately
          S$3.1bn in annual donations.
        </Text>
      </VStack>
    </Center>
  );
};

export default SignUpWaiting;
