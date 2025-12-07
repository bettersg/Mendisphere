import React from "react";
import { useNavigate } from "react-router-dom";
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

const RegistrationVerified = () => {
    const navigate = useNavigate();

    return (
        <RegistrationWrapper>
            <Typography
                fontWeight={"semibold"}
                variant="h3"
                sx={{
                    marginBottom: "19px",
                    color: colors.neutral.primary,
                }}
            >
                Email Verified!
            </Typography>
            <Box textAlign="center" sx={{ marginBottom: 6, marginTop: 6 }}>
                <img src={CheckFilled} alt="check icon" width={64} height={64} style={{ margin: "0px auto 20px auto" }} />
                <Typography variant="body1" sx={{ color: colors.neutral.primary }} marginTop={2} marginBottom={2} >
                    You have successfully verified your email! You may now proceed to sign in.
                </Typography>
            </Box>

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

export default RegistrationVerified;