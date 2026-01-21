
import { Stack } from '@mui/system';
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Link, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./style.scss";
import { Paths } from "../../routing";
import {Link as RouterLink} from "react-router-dom"
import UserService from "../../services/UserService"
import { useNavigate } from "react-router-dom";

interface FormData{
  email: string;
  password: string;
}



export default function LoginForm() {
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
    setPasswordError(false);
    setFormData((prevState:FormData)=>({
      ...prevState,
      [name]:value,
    }));
  }
  const [emailError,setEmailError]=useState(false);
  const [emailErrorMessage,setEmailErrorMessage]=useState("")
  const [passwordError,setPasswordError]=useState(false)
  const [passwordErrorMessage,setPasswordErrorMessage]=useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setEmailError(false);
  setPasswordError(false);

  try {
    const user = await UserService.loginUser(formData.email, formData.password);

    navigate(Paths.dashboard);

  } catch (err: any) {
    console.error(err);

    if (err.code === "auth/user-not-found") {
      setEmailErrorMessage("This email isn’t registered with us. Please double-check or create an account to get started.")
      setEmailError(true);
    } else if (err.code === "auth/wrong-password") {
      setPasswordErrorMessage("The password entered is incorrect. Kindly try again or reset your password.")
      setPasswordError(true);
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
    <form onSubmit={handleSubmit}>
    <Stack spacing={9} sx={{justifyContent:'center'}}>
      <Stack>
        <Typography variant='h3'>Welcome Back 👋</Typography>
        <Typography variant='body1'>Connect with our community and get access to resources.</Typography>
      </Stack>
      <Stack spacing={2}>
          <TextField error={!!emailError} helperText={emailError ? emailErrorMessage:""} value={formData.email} onChange={handleChange} name="email" required type="email" autoComplete='username' placeholder="Enter your email" label="Email" variant='outlined'></TextField>
          <TextField error={!!passwordError} helperText={passwordError ? passwordErrorMessage:""} value={formData.password} onChange={handleChange} name="password" required type={showPassword ? 'text':'password'} autoComplete='current-password' placeholder="Enter your password" label="Password" variant='outlined'
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          />
          <Link component={RouterLink} to={Paths.forgotPassword} display='flex' sx={{ width:'100%',justifyContent:'end'}}> Forgot your password? </Link>
          <Button type="submit" color='primary' variant='contained'>LOGIN</Button>
          <Typography variant='body1' sx={{display:'flex',width:'100%', justifyContent:'center'}}>Don't have an account?&nbsp;<Link component={RouterLink} to={Paths.signup}>Sign up</Link></Typography>
      </Stack>
    </Stack>
    </form>
  );
}
