import { Route, Routes } from "react-router-dom";
import OrganisationList from "../pages/organisationList";
import LoginPage from "../pages/login";
import UserDashboardPage from "../pages/userDashboard";
import OrgProfilePage from "../pages/organisationProfile";
import FirestoreMock from "../mocks/firestoreMock";
import Home from "../pages/home";
import Registration from "../pages/registration";
import { Paths } from ".";

const Routing = () => {
  return (
    <Routes>
      <Route path={Paths.home} element={<Home />} />
      <Route path={Paths.login} element={<LoginPage />} />
      <Route path={Paths.dashboard} element={<UserDashboardPage />} />
      <Route path={Paths.signup} element={<Registration />} />
      {/* <Route path={Paths.profileSetup} element={<ProfileSetup />} /> */}
      <Route path={Paths.organisationListing} element={<OrganisationList />} />
      <Route path={Paths.organisationProfile} element={<OrgProfilePage />} />
      {process.env.NODE_ENV === "development" && (
        <Route path="firestore-mock" element={<FirestoreMock />} />
      )}
    </Routes>
  );
};

export default Routing;
