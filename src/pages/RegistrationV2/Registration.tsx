import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box,Container,Stack} from '@mui/system';
import { useMediaQuery, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { colors } from "../../theme/colours";
import Autocomplete from "@mui/material/Autocomplete";
import RegistrationWrapper from "./RegistrationWrapper";
import { Paths } from "../../routing";
import RegistrationForm from "./RegistrationForm";
import RegistrationTopBar from "./RegistrationTopBar";
import { muiTheme } from '../../theme/muiTheme';


const Registration = () => {
  const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))

  return (
    <Stack direction={['column','column','row']} sx={{minHeight:{mobile:"auto",desktop:"100vh"}, display:'flex'}}>
      {isMobile?(
      <Box className="rounded_edge_rectangle_horizontal" sx={{alignContent:'center', display:'flex', justifyContent:'center', height:'7vh'}}>
          <img src="/images/registration.png" style={{ width:"10%", height:"auto", objectFit:"contain"}}/>
      </Box>
      
      )
      :
      (
      <>
      <Box className="rounded_edge_rectangle" sx={{order: { mobile:-1, desktop:1},flex:"1", alignContent:'center', display:'flex', justifyContent:'center'}}>
        <img src="/images/registration.png" style={{ width:"40%", height:"auto", objectFit:"contain"}}/>
      </Box>
      </>
    )}
      <Stack spacing={{mobile:4, desktop:12}} sx={{order: { mobile:1, desktop:-1}, width:{mobile:'100%', desktop:'50%'}, px:9,py:4}}>
        <RegistrationTopBar/>
        <RegistrationForm/>
      </Stack>
    </Stack>
  );
};

export default Registration;