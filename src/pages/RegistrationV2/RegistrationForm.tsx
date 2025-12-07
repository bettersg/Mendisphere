import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { colors } from "../../theme/colours";
import Autocomplete from "@mui/material/Autocomplete";
import RegistrationWrapper from "./RegistrationWrapper";
import { Paths } from "../../routing";

const organisationOptions = ["Organisation 1", "Organisation 2", "+ Add New Organisation"];

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [userType, setUserType] = useState<"organisation" | "consultant">("organisation");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    organisation?: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    password?: string;
  }>({});

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (userType === "organisation" && !organisation) newErrors.organisation = "Organisation is required";
    if (!givenName) newErrors.givenName = "Given Name is required";
    if (!familyName) newErrors.familyName = "Family Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "8+ characters, mix of letters and numbers";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate(Paths.emailVerification, { state: { email } });

      console.log({
        userType,
        organisation,
        givenName,
        familyName,
        email,
        password,
      });
    }
  };

  const boxShadows = {
    boxShadow: "0px 3px 5px -1px #00000033, 0px 6px 10px 0px #00000024, 0px 1px 18px 0px #0000001F",
  };

  const primaryButtonStyle = {
    backgroundColor: colors.brand.primary,
    color: colors.neutral.white,
    marginRight: "0px",
    border: "none",
    ...boxShadows,
  };

  const secondaryButtonStyle = {
    backgroundColor: colors.neutral.white,
    color: colors.brand.primary,
    border: "none",
    ...boxShadows
  };

  const handleOrganisationChange = (event: any, value: string | null) => {
    if (value === "+ Add New Organisation") {
      console.log("Add New Organisation clicked");
      alert("You clicked Add New Organisation!");
    } else {
      setOrganisation(value || "");
    }
  };

  return (
    <RegistrationWrapper>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          marginBottom: "19px",
          color: colors.neutral.primary,
        }}
      >
        Get Connected 🚀
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: "50px",
          color: colors.neutral.primary,
        }}
      >
        Connect with our community and get access to resources.
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ marginBottom: "50px" }}
      >
        <Button
          size="large"
          variant={userType === "organisation" ? "contained" : "outlined"}
          sx={userType === "organisation" ? primaryButtonStyle : secondaryButtonStyle}
          onClick={() => setUserType("organisation")}
        >
          ORGANISATION
        </Button>
        <Button
          size="large"
          variant={userType === "consultant" ? "contained" : "outlined"}
          sx={userType === "consultant" ? primaryButtonStyle : secondaryButtonStyle}
          onClick={() => setUserType("consultant")}
        >
          CONSULTANT
        </Button>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        {userType === "organisation" &&
          <Autocomplete
            options={organisationOptions}
            onChange={handleOrganisationChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Name of Organisation"
                variant="outlined"
                error={userType === "organisation" && !!errors.organisation}
                helperText={errors.organisation}
              />
            )}
            sx={{ marginBottom: 3 }}
          />
        }

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Given Name"
              fullWidth
              variant="outlined"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              error={!!errors.givenName}
              helperText={errors.givenName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Family Name"
              fullWidth
              variant="outlined"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              error={!!errors.familyName}
              helperText={errors.familyName}
            />
          </Grid>
        </Grid>

        <TextField
          label="Email Address"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ marginBottom: 3 }}
        />

        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password || "8+ characters, mix of letters and numbers"}
          sx={{ marginBottom: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            ...primaryButtonStyle,
            marginBottom: 2,
          }}
        >
          NEXT
        </Button>

        <Typography variant="body2" align="center">
          Already have an account? <Link href="/signin">Sign in</Link>
        </Typography>
      </Box>
    </RegistrationWrapper>
  );
};

export default Registration;