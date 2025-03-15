import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { ReactComponent as HomeIcon3 } from "../../assets/icons/homeIcon3.svg";
import "../style.scss";

const TogetherSection = () => {
  return (
    <Box sx={{ backgroundColor: '#192873', py: 12, px: 3 }}>
      <Container className="page-width page-padding">
        <Grid container spacing={6} justifyContent="space-between" alignItems="center" width="100%" margin="0 !important">
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }} padding="0 !important">
            <HomeIcon3 style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6} padding="0 !important">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 40, md: 80 },
                color: "#F5F5F5",
                fontWeight: 700,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Together, we can go further.
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 24, md: 32 },
                color: "#F5F5F5",
                fontWeight: 400,
                paddingTop: 2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Mendisphere connects non-profits focusing on mental health with
              the support they need to maximise their impact and reach more
              people.
            </Typography>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, marginTop: 2 }}>
              {/* <Button sx={styles.whiteButton1}>Our Story</Button> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TogetherSection;
