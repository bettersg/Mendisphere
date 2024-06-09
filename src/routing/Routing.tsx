import { Route, Routes } from "react-router-dom";
import { Paths } from "./Paths";
import OrganisationList from "../pages/OrganisationList";
import LoginPage from "../pages/Login";
import UserDashboardPage from "../pages/UserDashboard";
import Registration from "../pages/Registration";
import ProfileSetupPage from "../pages/Registration/ProfileSetup";
import OrgProfilePage from "../pages/OrganisationProfile";
import FirestoreMock from "../mocks/FirestoreMock";
import Home from "../pages/Home";

const Routing = () => {
  return (
    <Routes>
      <Route path={Paths.home} element={<Home />} />
      <Route path={Paths.login} element={<LoginPage />} />
      <Route path={Paths.dashboard} element={<UserDashboardPage />} />
      <Route path={Paths.signup} element={<Registration />} />
      <Route path={Paths.profileSetup} element={<ProfileSetupPage />} />
      <Route path={Paths.organisationListing} element={<OrganisationList />} />
      <Route path={Paths.organisationProfile} element={<OrgProfilePage />} />
      {process.env.NODE_ENV === "development" && (
        <Route path="firestore-mock" element={<FirestoreMock />} />
      )}
    </Routes>
  );
};

export default Routing;
