import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail, resendVerificationEmail } from '../../services/UserService';
import { useMediaQuery } from '@mui/material';
import RegistrationTopBar from "./RegistrationTopBar";
import { muiTheme } from '../../theme/muiTheme';
import {
    Box,
    Typography,
    Button,
    Snackbar,
    Alert,
    CircularProgress
} from "@mui/material";
import {Stack} from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CheckFilled from "../../assets/icons/checkFilled.svg";
import { Paths } from "../../routing";
import {auth} from "../../services/Firebase/firebaseConfig"

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
              setTimeout(() => {
                navigate(Paths.emailVerification);
                }, 1500);
          } catch (err: any) {
              setSnackbarMessage(err.message || "Failed to resend email");
              setSnackbarSeverity("error");
              setOpenSnackbar(true);
          }
      };

useEffect(() => {
  const tryVerifyEmail = async () => {
    const oobCode = searchParams.get('oobCode');
    const mode = searchParams.get('mode');

    // Handle password reset mode - redirect to reset password page
    if (mode === 'resetPassword' && oobCode) {
      navigate(`${Paths.resetPassword}?oobCode=${oobCode}`);
      return;
    }

    if (!oobCode || mode !== 'verifyEmail') {
      // Set up auth state listener for emulator redirects
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            setStatus(VerificationStatus.SUCCESS);
            setTimeout(() => navigate(Paths.dashboard), 3000);
          } else {
            setStatus(VerificationStatus.INVALID);
            setErrorMessage('Verification link is missing or has expired.');
          }
        } else {
          setStatus(VerificationStatus.INVALID);
          setErrorMessage('Verification link is missing or has expired.');
        }
      });

      // Cleanup listener after a short delay
      setTimeout(() => unsubscribe(), 2000);
      return;
    }

    // Normal verification flow with oobCode
    try {
      await verifyEmail(oobCode);
      setStatus(VerificationStatus.SUCCESS);
      setTimeout(() => navigate(Paths.dashboard), 3000);
    } catch (error: any) {
      setStatus(VerificationStatus.ERROR);
      setErrorMessage(error.message);
    }
  };

  tryVerifyEmail();
}, [searchParams, navigate]);

  const renderContent = () => {
    switch (status) {
      case VerificationStatus.LOADING:
        return (
           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
