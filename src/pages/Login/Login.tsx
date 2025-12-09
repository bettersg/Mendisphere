
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
import LoginForm from './LoginForm';
import "./style.scss";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Stack direction={['column','column','row']} sx={{minHeight:"100vH", display:'flex', height:'100%'}}>
      <Stack sx={{order: { mobile:1, desktop:-1}, width:'50%',p: { sm: 3, md: 9, lg:12, xl:12}}}>
        <LoginTopBar/>
        <LoginForm/>
      </Stack>
      <Box className="rounded_edge_rectangle" sx={{order: { mobile:-1, desktop:1},flex:"1", alignContent:'center', display:'flex', justifyContent:'center'}}>
        <img src="/images/login.png" style={{ width:"40%", height:"auto", objectFit:"contain"}}/>
      </Box>
    </Stack>
  );
};

export default Login;
