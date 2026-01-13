
import { Box,Container,Stack} from '@mui/system';
import React, { Component, useState } from "react";import Typography from "@mui/material/Typography";
import { Link,IconButton,Button,FormControl, TextField, InputAdornment} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./style.scss";
import CheckFilled from "../../assets/icons/checkFilled.svg";
import { Paths } from "../../routing";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Link as RouterLink} from "react-router-dom"
import UserService from "../../services/UserService"
import { useNavigate } from "react-router-dom";
   
interface FormData{
  email: string;
  password: string;
}



export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData,setFormData]=useState<FormData>({
    email:"",
    password:""
  })

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setEmailError(false);
    setFormData((prevState:FormData)=>({
      ...prevState,
      [name]:value,
    }));
  }
  const [emailError,setEmailError]=useState(false);
  const [emailErrorMessage,setEmailErrorMessage]=useState("")

  const auth=getAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setEmailError(false);

  try {
    const user = await UserService.sendPasswordReset(formData.email);

    navigate(Paths.dashboard);

  } catch (err: any) {
    console.error(err);

    if (err.code === "auth/user-not-found") {
      setEmailErrorMessage("This email isn’t registered with us. Please double-check or create an account to get started.")
      setEmailError(true);
    }
    else if(err.message=="Email not verified"){
        setEmailErrorMessage("Email is not verified. Please verify your email before logging in.")
        setEmailError(true);
    }
    else {
      setEmailErrorMessage("An unexpected error occurred. Please try again later.")
      setEmailError(true);
    }
  }
};

  
  return (
    <>
    <form onSubmit={handleSubmit}>
    <Stack spacing={9} sx={{justifyContent:'center'}}>
      <Stack>
        <Typography variant='h3'>Password Recovery</Typography>
        <Typography variant='body1'>Provide the email address associated with your account for password recovery details.</Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField error={!!emailError} helperText={emailError ? emailErrorMessage:""} value={formData.email} onChange={handleChange} name="email" required type="email" autoComplete='username' placeholder="Enter your account email" label="Account Email" variant='outlined'></TextField>
        <Button type="submit" color='primary' variant='contained'>SEND</Button>
      </Stack>
    </Stack>
    </form>
    <Stack direction='row'>
        <img src={CheckFilled} alt="check icon" width={64} height={64} />
        <Typography variant="body1">
            You have successfully verified your email! You may now proceed to sign in.
        </Typography>
    </Stack>
   </>
  );
}
