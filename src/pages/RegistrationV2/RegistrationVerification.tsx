import React, { useState,useEffect} from "react"; // Added useState
import { useNavigate, useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Link, Stack,Snackbar,Alert
} from "@mui/material";
import CheckFilled from "../../assets/icons/checkFilled.svg";
import { colors } from "../../theme/colours";
import { Paths } from "../../routing";
import { resendVerificationEmail } from "../../services/UserService";
import { getAuth } from "firebase/auth";
import { useMediaQuery } from '@mui/material';
import RegistrationTopBar from "./RegistrationTopBar";
import { muiTheme } from '../../theme/muiTheme';

const RegistrationVerification = () => {
    const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    
    const [isChecking, setIsChecking] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const firebaseUser = location.state?.firebaseUser
    ?? JSON.parse(localStorage.getItem("firebaseUser") || "null")
    ?? getAuth().currentUser;

    const checkVerificationStatus = async () => {
        setIsChecking(true);
        try {
            const auth = getAuth();
            if (auth.currentUser) {
                await auth.currentUser.reload(); 
                
                if (auth.currentUser.emailVerified) {
                    setSnackbarMessage("Email verified! Redirecting...");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    setTimeout(() => navigate(Paths.dashboard), 1500); 
                }
            }
        } catch (err: any) {
            setSnackbarMessage("Error checking status: " + err.message);
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setIsChecking(false);
        }
    };

    useEffect(() => {
        window.addEventListener('focus', checkVerificationStatus);
        return () => window.removeEventListener('focus', checkVerificationStatus);
    }, []);
    
    const handleResendEmailClick = async () => {
        try {
            await resendVerificationEmail(); 
            
            setSnackbarMessage("Verification email resent successfully");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        } catch (err: any) {
            setSnackbarMessage(err.message || "Failed to resend email");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };


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
        <Stack spacing={5}>
            <Stack>
                <Typography variant='h3'>Get Connected 🚀</Typography>
                <Typography variant='body1'>Connect with our community and get access to resources.</Typography>
            </Stack>
            <Stack spacing={2}>
                <Stack spacing={1} direction={"row"} alignItems={"center"}>
                    <img src={CheckFilled} alt="check icon" width={64} height={64} />
                    <Typography variant="body1" sx={{ color: colors.neutral.primary }}>
                        Account verification link has been sent. Please check your email to verify your account.
                    </Typography>
                </Stack>
                <Typography variant="body1" sx={{ color: colors.neutral.primary,}}>
                Didn't receive the email? <Link onClick={handleResendEmailClick}>Resend Email</Link>
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
 
    );
};

export default RegistrationVerification;