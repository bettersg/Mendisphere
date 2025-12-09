
import { Box,Container,Stack} from '@mui/system';
import * as React from 'react';
import Typography from "@mui/material/Typography";
import { Link,IconButton,Button,FormControl, TextField, InputAdornment} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginDesign from "./LoginDesign";
import LoginSection from "./LoginSection";
import LoginTopBar from './LoginTopBar';
import "./style.scss";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Stack spacing={9} sx={{justifyContent:'center'}}>
      <Stack>
        <Typography variant='h3'>Welcome Back 👋</Typography>
        <Typography variant='body1'>Connect with our community and get access to resources.</Typography>
      </Stack>
      <Stack spacing={2} sx={{justifyContent:'center'}}>
          <FormControl>
            <Stack spacing={2}>
              <TextField required type="email" autoComplete='username' placeholder="Enter your email" label="Email" variant='outlined'></TextField>
              <TextField required type="password" autoComplete='current-password' placeholder="Enter your password" label="Password" variant='outlined' InputProps={{ 
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton 
                        onClick={handleClickShowPassword} 
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </Stack>
          </FormControl>
          <Link href="#" display='flex' sx={{ width:'100%',justifyContent:'end'}}> Forgot your password? </Link>
          <Button color='primary' variant='contained'>NEXT</Button>
          <Typography variant='body1' sx={{display:'flex', width:'100%', justifyItems:'center'}}>Don't have an account?{' '} <Link>Sign up</Link></Typography>
      </Stack>
    </Stack>
  );
}
