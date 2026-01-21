
import { Box,Container,Stack} from '@mui/system';
import * as React from 'react';
import TopBar from './TopBar';
import { muiTheme } from '../../theme/muiTheme';
import LoginForm from './LoginForm';
import "./style.scss";
import PersonIcon from '@mui/icons-material/Person';
import { useMediaQuery, useTheme } from '@mui/material';

const Login = () => {
  const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Stack direction={['column','column','row']} sx={{minHeight:{mobile:"auto",desktop:"100vh"}, display:'flex'}}>
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
            { label: "Login", icon: <PersonIcon />, href: "/" },
          ]}
        />
        <LoginForm/>
      </Stack>
    </Stack>
  );
};

export default Login;
