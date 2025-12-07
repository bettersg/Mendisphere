import React from "react";
import {
    Box,
    Grid,
    Typography,
    Button
} from "@mui/material";
import { ChevronLeft, PersonSharp } from "@mui/icons-material";
import { colors } from "../../theme/colours";
import BreadcrumbsV2 from "../../components/BreadcrumbsV2";

const Registration = (props: any) => {
    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    padding: "35px 70px",
                }}
            >
                <Button
                    startIcon={<ChevronLeft />}
                    sx={{
                        marginBottom: "20px",
                        textTransform: "none",
                        color: colors.neutral.primary,
                    }}
                >
                    BACK
                </Button>

                <Box
                    sx={{
                        padding: "0px 0px 53px 0px",
                    }}
                >
                    <BreadcrumbsV2
                        links={[{ label: "Register", icon: <PersonSharp fontSize="inherit" /> }]}
                    />
                </Box>
                {props.children}
            </Grid>

            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    height: "100vh",
                    position: "relative",
                }}
            >
                <Box className="rounded_edge_rectangle" sx={{ height: "100%", width: "100%" }}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "auto",
                            height: "auto",
                            maxWidth: "80%",
                            maxHeight: "80%",
                        }}
                    >
                        <img
                            src="/images/registration.png"
                            alt="Registration"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Registration;