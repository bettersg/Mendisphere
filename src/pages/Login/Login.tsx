
import { Box,Container} from '@mui/system';
import * as React from 'react';
import Typography from "@mui/material/Typography";
import { Link,IconButton,Button,FormControl, TextField, InputAdornment} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginDesign from "./LoginDesign";
import LoginSection from "./LoginSection";
import "./style.scss";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Box sx={{minHeight:"100vH", display:'flex', height:'100%'}}>
      <Box sx={{flex:"1"}}>
        <Box>
          <Button variant="text" sx={{color:'text.primary'}}><ArrowBackIosIcon/>Back</Button>
        </Box>
        <Box display="flex" sx={{flexDirection:'column'}}>
          <Typography variant='h3'>Welcome Back 👋</Typography>
          <Typography variant='body1'>Connect with our community and get access to resources.</Typography>
          <FormControl>
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
          </FormControl>
  
          <Link href="#" display='flex' sx={{ width:'100%',justifyContent:'end'}}> Forgot your password? </Link>
          <Button color='primary' variant='contained'>NEXT</Button>
          <Typography display='flex' variant='body1' sx={{width:'100%', justifyContent:'center'}}>Don't have an account? <Link>Sign up</Link></Typography>
        </Box>
      </Box>
      <Box className="rounded_edge_rectangle" sx={{flex:"1", alignContent:'center', display:'flex', justifyContent:'center'}}>
        <img src="/images/login.png" style={{ width:"70%", height:"auto", objectFit:"contain"}}/>
      </Box>
    </Box>
  );
};

export default Login;
