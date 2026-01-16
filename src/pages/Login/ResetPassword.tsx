
import { Box,Container,Stack} from '@mui/system';
import { Alert, Snackbar, Link,IconButton,Button,FormControl, TextField, InputAdornment} from '@mui/material';

import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import TopBar from './TopBar';
import { muiTheme } from '../../theme/muiTheme';
import LoginForm from './LoginForm';
import "./style.scss";
import { useMediaQuery, useTheme } from '@mui/material';
import ForgotPasswordForm from './ForgotPasswordForm';
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
import { useSearchParams, useNavigate } from "react-router-dom";
import { colors } from "../../theme/colours";
interface FormData{
  password: string;
}

export default function ResetPassword(){
  const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [passwordError,setPasswordError]=useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [formData,setFormData]=useState<FormData>({
    password:""
  })
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setPasswordError(false);
    setFormData((prevState:FormData)=>({
      ...prevState,
      [name]:value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError(false);
    setPasswordErrorMessage("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.password) {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
      return; 
    } else if (!passwordRegex.test(formData.password)) {
      setPasswordError(true);
      setPasswordErrorMessage("8+ characters, mix of letters and numbers");
      return;
    }

    try {
      if (oobCode) {
        await UserService.confirmPasswordResetWithCode(oobCode, formData.password);
        setTimeout(() => navigate(Paths.login), 3000);
        setOpenSnackbar(true);
      }
      else{
        setPasswordError(true);
        setPasswordErrorMessage("Reset link is invalid.");
      }
    } catch (err: any) {
      console.error(err);
      setPasswordError(true);
      setPasswordErrorMessage("Reset link is invalid or expired.");
    }
  };

  return (
    
    <Stack direction={['column','column','row']} sx={{minHeight:{mobile:"auto",desktop:"100vh"}, display:'flex'}}>
      <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
            <Alert 
                onClose={() => setOpenSnackbar(false)} 
                severity={"success"} 
                sx={{ width: '100%' }}
            >
                Password successfully reset! Redirecting to Login.
            </Alert>
        </Snackbar>
      {isMobile?(
      <Box className="rounded_edge_rectangle_horizontal" sx={{alignContent:'center', display:'flex', justifyContent:'center', height:'7vh'}}>
          <img src="/images/login.png" style={{ width:"10%", height:"auto", objectFit:"contain"}}/>
      </Box>
      
      )
      :
      (
      <>
      <Box className="rounded_edge_rectangle" sx={{order: { mobile:-1, desktop:1},flex:"1", alignContent:'center', display:'flex', justifyContent:'center'}}>
        <img src="/images/login.png" style={{ width:"40%", height:"auto", objectFit:"contain"}}/>
      </Box>
      </>
    )}
      <Stack spacing={{mobile:4, desktop:12}} sx={{order: { mobile:1, desktop:-1}, width:{mobile:'100%', desktop:'50%'}, px:9,py:4}}>
        <TopBar
          links={[
            { label: "", icon: <PersonIcon />, href: "/login" },
            { label: "Forgot Password", icon: <LockIcon />}
        ]}
        />
        <Stack>
            <Typography variant='h3'>Password Recovery</Typography>
            {/* <Typography variant='body1'>Please enter a new password.</Typography> */}
        </Stack>
        <Stack spacing={5}>
            <Stack spacing={2}>
                <Stack component="form" onSubmit={handleSubmit} direction="column" spacing={2}>
                    <TextField error={!!passwordError} helperText={passwordError? passwordErrorMessage:"8+ characters, mix of letters and numbers"} value={formData.password} onChange={handleChange} name="password" required type={showPassword ? 'text':'password'} autoComplete='current-password' placeholder="Enter your new password" label="New Password" variant='outlined'
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
                    <Button type="submit" color='primary' variant='contained'>RESET</Button>
                </Stack>
            </Stack>
            </Stack>
            </Stack>
      </Stack>
  );
};

