import React, { useEffect, useState } from 'react';
import { useNavigate,useSearchParams } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Link,
} from "@mui/material";
import CheckFilled from "../../assets/icons/checkFilled.svg";
import { colors } from "../../theme/colours";
import { Paths } from "../../routing";
import { useMediaQuery, useTheme } from '@mui/material';
import RegistrationForm from "./RegistrationForm";
import RegistrationTopBar from "./RegistrationTopBar";
import { muiTheme } from '../../theme/muiTheme';
import { Container,Stack} from '@mui/system';
import { verifyEmail, resendVerificationEmail } from '../../services/UserService';

enum VerificationStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  INVALID = 'invalid'
}


const RegistrationVerified = () => {
    const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.LOADING);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isResending, setIsResending] = useState<boolean>(false);
    const [resendMessage, setResendMessage] = useState<string>('');


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
        <Typography
                fontWeight={"semibold"}
                variant="h3"
            >
                Email Verified!
            </Typography>
            <Stack display='flex' alignItems="center" spacing={2}>
                <img src={CheckFilled} alt="check icon" width={64} height={64} />
                <Typography variant="body1">
                    You have successfully verified your email! You may now proceed to sign in.
                </Typography>
            </Stack>

            <Button
                onClick={() => navigate(Paths.login)}
                variant="contained"
                color="primary"
                fullWidth
            >
                SIGN IN
            </Button>
      
      </Stack>
    </Stack>
        
 
    );
};

export default RegistrationVerified;