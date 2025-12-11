
import { Box,Container,Stack} from '@mui/system';
import * as React from 'react';
import LoginTopBar from './LoginTopBar';
import { muiTheme } from '../../theme/muiTheme';
import LoginForm from './LoginForm';
import "./style.scss";
import { useMediaQuery, useTheme } from '@mui/material';

const Login = () => {
  const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Stack direction={['column','column','row']} sx={{minHeight:"100vH", display:'flex', height:'100%'}}>
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
      <Stack spacing={{mobile:0, desktop:12}} sx={{order: { mobile:1, desktop:-1}, width:{mobile:'100%', desktop:'50%'}, padding:{ mobile:9, desktop:12}, pt:{mobile:0},pb:{mobile:0}}}>
        <LoginTopBar/>
        <LoginForm/>
      </Stack>
    </Stack>
  );
};

export default Login;
