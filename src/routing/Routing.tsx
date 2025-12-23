import { Route, Routes } from "react-router-dom";
import OrganisationList from "../pages/OrganisationList";
import LoginPage from "../pages/Login";
import UserDashboardPage from "../pages/UserDashboard";
import OrgProfilePage from "../pages/OrganisationProfile";
import Home from "../pages/Home";
import Registration from "../pages/RegistrationV2/Registration";
import VerifyEmail from "../pages/VerifyEmail";
import { Paths } from ".";
import RegistrationVerificaion from "../pages/RegistrationV2/RegistrationVerification";
import NotFound from "../pages/NotFound/NotFound";
import RegistrationVerified from "../pages/RegistrationV2/RegistrationVerified";

const Routing = () => {
  return (
    <Routes>
      <Route path={Paths.home} element={<Home />} />
      <Route path={Paths.login} element={<LoginPage />} />
      <Route path={Paths.dashboard} element={<UserDashboardPage />} />
      <Route path={Paths.signup} element={<Registration />} />
      <Route path={Paths.emailVerification} element={<RegistrationVerificaion />} />
      <Route path={Paths.emailVerified} element={<RegistrationVerified />} />
      {/* <Route path={Paths.profileSetup} element={<ProfileSetup />} /> */}
      <Route path={Paths.OrganisationListing} element={<OrganisationList />} />
      <Route path={Paths.organisationProfile} element={<OrgProfilePage />} />
      <Route path={Paths.verifyEmail} element={<VerifyEmail />} />
    </Routes>
  );
};

export default Routing;
