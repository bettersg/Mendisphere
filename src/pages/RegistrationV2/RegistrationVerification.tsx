import React, { useState } from "react"; // Added useState
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
import NotFound from "../NotFound/NotFound";
import { getAuth } from "firebase/auth";
import {emailVerification } from "../../services/UserService";
import { useMediaQuery, useTheme } from '@mui/material';
import RegistrationForm from "./RegistrationForm";
import RegistrationTopBar from "./RegistrationTopBar";
import { muiTheme } from '../../theme/muiTheme';

const RegistrationVerification = () => {
    const isMobile=useMediaQuery(muiTheme.breakpoints.down('desktop'))
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    
    
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const firebaseUser = location.state?.firebaseUser
    ?? JSON.parse(localStorage.getItem("firebaseUser") || "null")
    ?? getAuth().currentUser;
    const handleResendEmailClick = async () => {
    
    // State for Snackbar

    try {
        if (!firebaseUser) {
            setSnackbarMessage("No user found to resend verification email");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }
        await emailVerification(firebaseUser);
        setSnackbarMessage("Verification email resent successfully");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
    } catch (err: any) {
        setSnackbarMessage(err.message || "Failed to resend email");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);    }
    };
    if (!email) {
        return <NotFound />;
    }


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