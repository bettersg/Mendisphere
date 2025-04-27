import { Route, Routes } from "react-router-dom";
import OrganisationList from "../pages/OrganisationList";
import LoginPage from "../pages/Login";
import UserDashboardPage from "../pages/UserDashboard";
import OrgProfilePage from "../pages/OrganisationProfile";
import FirestoreMock from "../mocks/FirestoreMock";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import { Paths } from ".";
import ConsultantProfile from "../pages/ConsultantProfile";

const Routing = () => {
  return (
    <Routes>
      <Route path={Paths.home} element={<Home />} />
      <Route path={Paths.login} element={<LoginPage />} />
      <Route path={Paths.dashboard} element={<UserDashboardPage />} />
      <Route path={Paths.signup} element={<Registration />} />
      {/* <Route path={Paths.profileSetup} element={<ProfileSetup />} /> */}
      <Route path={Paths.OrganisationListing} element={<OrganisationList />} />
      <Route path={Paths.organisationProfile} element={<OrgProfilePage />} />
      <Route path={Paths.consultantProfile} element={<ConsultantProfile />} />
      {process.env.NODE_ENV === "development" && (
        <Route path="firestore-mock" element={<FirestoreMock />} />
      )}
    </Routes>
  );
};

export default Routing;
