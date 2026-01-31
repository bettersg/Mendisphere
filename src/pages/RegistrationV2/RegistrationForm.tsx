import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Link,
  IconButton,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import { Paths } from "../../routing";
import { getAllOrganisations } from "../../services/OrganisationService"; 
import { Organisation } from "../../data/Model/Organisation";
import { createOrganisationWithUser,createUserWithAuth} from "../../services/UserService";
import { UserType } from "../../data/Enums/user-type.enum";
import { UserRole } from "../../data/Enums/user-role.enum";
import { createConsultant } from "../../services/ConsultantService";

function RegistrationForm(){
  const navigate = useNavigate();
  const [organisationOptions, setOrganisationOptions] = useState<Organisation[]>([]);
  useEffect(() => {
  getAllOrganisations().then(orgs => {
      if (!orgs) return;

      setOrganisationOptions([
        ...orgs,
        { id: "new", name: "+ Add New Organisation" } as Organisation,
      ]);
    });
  }, []);
  const [newOrganisationState,setNewOrganisationState]=useState(false);
  const [newOrganisation,setNewOrganisation]=useState("");
  const [organisationId, setOrganisationId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    newOrganisation?:string;
  }>({});

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (userType === "organisation" && !newOrganisationState && !organisationId) {
      newErrors.organisation = "Organisation is required";
    }    
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

  if (newOrganisationState) {
    const trimmedName = newOrganisation.trim().toLowerCase();
    const duplicateOrg = organisationOptions.find(
      (org) => org.id !== "new" && org.name.toLowerCase() === trimmedName
    );
    if (duplicateOrg) {
      newErrors.newOrganisation = "An organisation with this name already exists";
    }
  }

    setErrors(newErrors);
    let result;
    if (Object.keys(newErrors).length === 0) {
      try {
        if (userType === "organisation") {
          if (newOrganisationState) {
            result=await createOrganisationWithUser(
              email,
              password,
              givenName,
              familyName,
              newOrganisation,
              UserType.organisation,
              UserRole.admin,
              false
            );
            result=result.user;
          } else {
            result=await createUserWithAuth(
              email,
              password,
              givenName,
              familyName,
              UserType.organisation,
              UserRole.admin,
              false,
              organisationId,
            );
          }
        } else {
          result=await createConsultant(
            email,
            password,
            givenName,
            familyName,
            UserRole.admin
          );
        }
        console.log(email,result);
        localStorage.setItem("firebaseUser", JSON.stringify(result.firebaseUser));
        navigate(Paths.emailVerification, { state: { email } });
      }
      catch(err:any){
        if (err.code === "auth/email-already-in-use") {
          setErrors((prev) => ({ ...prev, email: "This email is already in use." }));
        } else if (err.code === "organisation/already-exists") {
          setErrors((prev) => ({ ...prev, organisation: "Organisation already exists" }));
        }
      }
    }
  };


 const handleOrganisationChange = (
  event: any,
  value: Organisation | null
) => {
  if (!value) return;

  if (value.id === "new") {
    setNewOrganisationState(true);
    setOrganisationId("");
  } else {
    setNewOrganisationState(false);
    setOrganisationId(value.id);
  }
};

  return (
    <Stack spacing={5}>
      <Stack>
        <Typography variant='h3'>Get Connected 🚀</Typography>
        <Typography variant='body1'>Connect with our community and get access to resources.</Typography>
      </Stack>
      <Box display='flex' justifyContent='center'>
          <ToggleButtonGroup value={userType} exclusive sx={{boxShadow:1}}>
            <ToggleButton size="large" value='organisation' onClick={() => setUserType("organisation")}>
              ORGANISATION
            </ToggleButton>
            <ToggleButton size="large" value='consultant' onClick={() => setUserType("consultant")}>
              CONSULTANT  
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        {userType === "organisation" &&
          <Autocomplete
            options={organisationOptions}
            getOptionLabel={(option) => option.name}
            onChange={handleOrganisationChange}
            filterOptions={(options, state) => {
              // always include the "Add New Organisation" option
              const filtered = options.filter((option) =>
                option.name.toLowerCase().includes(state.inputValue.toLowerCase())
              );

              const addNewOption = options.find((option) => option.id === "new");
              if (addNewOption && !filtered.includes(addNewOption)) {
                filtered.push(addNewOption);
              }

              return filtered;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Name of Organisation"
                variant="outlined"
                error={userType === "organisation" && !!errors.organisation}
                helperText={errors.organisation}
              />
            )}
          />
        }
        {newOrganisationState && (
          <TextField
                label="Name of New Organisation"
                variant="outlined"
                onChange={(e)=>setNewOrganisation(e.target.value)}  
                required
                error={userType === "organisation" && !!errors.newOrganisation}
                helperText={errors.newOrganisation}
              />
        )}
        <Stack direction={'row'} spacing={3}>
          <TextField
                required
                label="Given Name"
                fullWidth
                variant="outlined"
                autoComplete="given-name"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                error={!!errors.givenName}
                helperText={errors.givenName}
              />
          <TextField
                required
                label="Family Name"
                fullWidth
                variant="outlined"
                autoComplete="family-name"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                error={!!errors.familyName}
                helperText={errors.familyName}
              />
        </Stack>
        <TextField
          required
          label="Email Address"
          fullWidth
          variant="outlined"
          autoComplete='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          required
          label="Password"
          fullWidth
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password || "8+ characters, mix of letters and numbers"}
          slotProps={{
            input:{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              }
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          NEXT
        </Button>
        <Typography variant="body1" align="center">
          Already have an account? <Link href="/login">Sign in</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default RegistrationForm;