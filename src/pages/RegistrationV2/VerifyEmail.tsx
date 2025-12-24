import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail, resendVerificationEmail } from '../../services/UserService';
import { useMediaQuery, useTheme } from '@mui/material';
import RegistrationTopBar from "./RegistrationTopBar";
import { muiTheme } from '../../theme/muiTheme';
import {
    Box,
    Typography,
    Button,
    Link,Snackbar,Alert, CircularProgress
} from "@mui/material";
import {Stack} from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import CheckFilled from "../../assets/icons/checkFilled.svg";
import { colors } from "../../theme/colours";
import { Paths } from "../../routing";


enum VerificationStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  INVALID = 'invalid'
}

const VerifyEmail: React.FC = () => {
  console.log('VerifyEmail component rendering');
  const [searchParams] = useSearchParams();
  const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))
  
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.LOADING);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>('');

const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  console.log('Current status:', status);
  const handleResendEmailClick = async () => {
          try {
              await resendVerificationEmail(); 
              
              setSnackbarMessage("Verification email resent successfully");
              setSnackbarSeverity("success");
              setOpenSnackbar(true);
              navigate(Paths.emailVerification)
          } catch (err: any) {
              setSnackbarMessage(err.message || "Failed to resend email");
              setSnackbarSeverity("error");
              setOpenSnackbar(true);
          }
      };

  useEffect(() => {
    const tryVerifyEmail = async () => {
      console.log('Starting email verification process');

      // Get the action code from the URL
      const oobCode = searchParams.get('oobCode');
      const mode = searchParams.get('mode');

      console.log('VerifyEmail component mounted with:', { oobCode, mode });

      // Validate that this is an email verification action
      if (mode !== 'verifyEmail') {
        console.log('Mode is not verifyEmail, marking invalid');
        setStatus(VerificationStatus.INVALID);
        setErrorMessage('Invalid verification link. Please request a new one.');
        return;
      }

      if (!oobCode) {
        console.log('No oobCode provided, marking invalid');
        setStatus(VerificationStatus.INVALID);
        setErrorMessage('Verification code is missing. Please request a new link.');
        return;
      }

      try {
        console.log('Starting email verification with code:', oobCode);
        await verifyEmail(oobCode);
        console.log('Email verified successfully');
        setStatus(VerificationStatus.SUCCESS);

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (error: any) {
        console.error('Error verifying email:', error);
        setStatus(VerificationStatus.ERROR);
        setErrorMessage(error.message || 'An error occurred while verifying your email.');
      }
    };

    tryVerifyEmail();
  }, [searchParams, navigate]);


  const renderContent = () => {
    switch (status) {
      case VerificationStatus.LOADING:
        return (
           <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
        );

      case VerificationStatus.SUCCESS:
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
                            onClick={() => navigate(Paths.dashboard)}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            SIGN IN
                        </Button>
            
                  </Stack>
                </Stack>
        );

      case VerificationStatus.ERROR:
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
                            Something went wrong.
                        </Typography>
                        <Stack display='flex' alignItems="center" spacing={2}>
                            <CloseIcon color='warning' sx={{width:64, height:64}}/>
                            <Typography variant="body1">
                                {errorMessage}
                            </Typography>
                        </Stack>
            
                        <Button
                            onClick={handleResendEmailClick}                                variant="contained"
                            color="primary"
                            fullWidth
                        >
                            RESEND LINK
                        </Button>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={4000}
                            onClose={() => setOpenSnackbar(false)}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                            <Alert 
                                onClose={() => setOpenSnackbar(false)} 
                                severity={snackbarSeverity} 
                                sx={{ width: '100%' }}
                            >
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                  </Stack>
                </Stack>
        
        );
        
      case VerificationStatus.INVALID:
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
                            Verification Failed
                        </Typography>
                        <Stack display='flex' alignItems="center" spacing={2}>
                            <CloseIcon  color='warning' sx={{width:64, height:64}}/>
                            <Typography variant="body1">
                                {errorMessage}
                            </Typography>
                        </Stack>
            
                        <Button
                            onClick={handleResendEmailClick}                                variant="contained"
                            color="primary"
                            fullWidth
                        >
                            RESEND LINK
                        </Button>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={4000}
                            onClose={() => setOpenSnackbar(false)}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                            <Alert 
                                onClose={() => setOpenSnackbar(false)} 
                                severity={snackbarSeverity} 
                                sx={{ width: '100%' }}
                            >
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                  </Stack>
                </Stack>
        
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="verify-email-container">
        {renderContent()}
      </div>
    </>
  );
};

export default VerifyEmail;
