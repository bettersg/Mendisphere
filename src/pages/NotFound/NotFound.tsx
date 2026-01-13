import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { colors } from "../../theme/colours";
import { Paths } from "../../routing";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            height="100vh"
            width="100%"
        >
            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="#f5f5f5"
                p={5}
            >
                <Box display="block">
                    <Typography variant="h3" align="left">
                        We couldn't find the page you're looking for.
                    </Typography>
                    <Typography variant="h5" align="left" my={3}>
                        The page might have been moved or no longer exists.
                    </Typography>
                    <Button
                        size="large"
                        onClick={() => navigate(Paths.home)}
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: colors.brand.primary,
                            color: colors.neutral.white,
                        }}
                    >
                        GO TO HOME <ArrowForward sx={{ ml: 1 }} />
                    </Button>
                </Box>
            </Box>

            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="#ffffff"
            >
                <img src="./images/disclaimer.png" alt="Page Not Found" />
            </Box>
        </Box>
    );
};

export default NotFound;