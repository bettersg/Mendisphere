
import { Stack } from '@mui/system';
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, TextField } from '@mui/material';
import "./style.scss";
import CheckFilled from "../../assets/icons/checkFilled.svg";
import { Paths } from "../../routing";
import UserService from "../../services/UserService"
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme/colours";
   
interface FormData{
  email: string;
}



export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailError(false);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setEmailErrorMessage("");

    try {
      await UserService.sendPasswordReset(formData.email);
      setEmailSent(true);
    } catch (err: any) {
      console.error(err);
      switch (err.code) {
        case "auth/user-not-found":
          setEmailError(true);
          setEmailErrorMessage(
            "This email isn’t registered with us. Please double-check or create an account."
          );
          break;
        case "auth/invalid-email":
          setEmailError(true);
          setEmailErrorMessage("Please provide a valid email address.");
          break;
        case "auth/too-many-requests":
          setEmailError(true);
          setEmailErrorMessage(
            "Too many reset requests. Please try again later."
          );
          break;
        default:
          setEmailError(true);
          setEmailErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
      }
    }
  };

  
  return (
    <Stack spacing={9} sx={{justifyContent:'center'}}>
        {emailSent?(
            <>
        <Stack>
            <Typography variant='h3'>Password Recovery</Typography>
        </Stack>
        <Stack spacing={5}>
            <Stack spacing={2}>
                <Stack spacing={1} direction={"row"} alignItems={"center"}>
                    <img src={CheckFilled} alt="check icon" width={64} height={64} />
                    <Typography variant="body1" sx={{ color: colors.neutral.primary }}>
                Your password recovery details have been emailed to you. Navigate to Sign In to continue logging in.
                    </Typography>
                </Stack>
            </Stack>

            <Button
                onClick={() => navigate(Paths.login)}
                variant="contained"
                color="primary"
                fullWidth
            >
                Navigate
            </Button>
            </Stack>
        </>
    ):(
        <>
            <Stack>
                <Typography variant='h3'>Password Recovery</Typography>
                <Typography variant='body1'>Provide the email address associated with your account for password recovery details.</Typography>
            </Stack>
            <Stack component="form" onSubmit={handleSubmit} direction="column" spacing={2}>
                <TextField error={!!emailError} helperText={emailError ? emailErrorMessage:""} value={formData.email} onChange={handleChange} name="email" required type="email" autoComplete='username' placeholder="Enter your account email" label="Account Email" variant='outlined'></TextField>
                <Button type="submit" color='primary' variant='contained'>SEND</Button>
            </Stack>
            </>
        
    )}
      
    </Stack>
  );
}
