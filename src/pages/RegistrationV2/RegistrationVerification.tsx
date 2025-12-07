import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Link,
} from "@mui/material";
import CheckFilled from "../../assets/icons/checkFilled.svg";
import { colors } from "../../theme/colours";
import RegistrationWrapper from "./RegistrationWrapper";
import { Paths } from "../../routing";
import NotFound from "../NotFound";

const RegistrationVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    if (!email) {
        return <NotFound />;
    }

    const handleResendEmailClick = () => {
        alert("Resend email clicked!");
    }

    return (
        <RegistrationWrapper>
            <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                    marginBottom: "19px",
                    color: colors.neutral.primary,
                }}
            >
                Get Connected 🚀
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    marginBottom: "50px",
                    color: colors.neutral.primary,
                }}
            >
                Connect with our community and get access to resources.
            </Typography>
            <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
                <img src={CheckFilled} alt="check icon" style={{ marginRight: "10px" }} width={64} height={64} />
                <Typography variant="body1" sx={{ color: colors.neutral.primary }}>
                    Account verification link has been sent. Please check your email to verify your account.
                </Typography>
            </Box>

            <Typography variant="body1" sx={{ color: colors.neutral.primary, marginBottom: 6 }}>
                Didn't receive the email? <Link onClick={handleResendEmailClick} style={{ cursor: "pointer" }} >Resend Email</Link>
            </Typography>

            <Button
                onClick={() => navigate(Paths.login)}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    backgroundColor: colors.brand.primary,
                    color: colors.neutral.white,
                    border: "none",
                    boxShadow: "0px 3px 5px -1px #00000033, 0px 6px 10px 0px #00000024, 0px 1px 18px 0px #0000001F",
                    "&:hover": {
                        backgroundColor: colors.interaction.focus,
                    },
                }}
            >
                SIGN IN
            </Button>

        </RegistrationWrapper>
    );
};

export default RegistrationVerification;