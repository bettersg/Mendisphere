
import { Box, Flex } from "@chakra-ui/react";
import { AuthContext } from "../../data/auth/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function UserDashboardPage() {
  const authContext = useContext(AuthContext);

  if (authContext.user === null) {
    console.log(
      "No authentication detected, unable to navigate to user dashboard page."
    );
    return <Navigate replace to="/" />;
  }

  const username = authContext.user?.email;

  return (
    <Flex minH="100vH">
      <Box flex="1">
        Login Successful! Welcome, <b>{username}</b>, to your dashboard.
      </Box>
    </Flex>
  );
}
