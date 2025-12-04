import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from "../../assets/images/3dcolleagues1.png"; // Update the path to your image

const HeroSection = () => {
  return (
    <Box sx={{ minHeight: '50vh', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between" spacing={4} width="100%" margin={0} paddingTop={0}>
          <Grid item xs={12} md={6} padding="0 !important">
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '588px' }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{ fontSize: { xs: '2rem', md: '3rem', lg: '80px' }, fontWeight: 'bold', color: '#333333' }}
              >
                Mental Health resources should reach everyone.
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{ fontSize: '1.25rem', color: '#333333', opacity: 0.8, fontWeight: 'normal', lineHeight: 1.5, mt: 3 }}
              >
                Amplify the impact of your mental health initiatives through collaboration.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/organisations"
                sx={{ borderRadius: '4px', width: '300px', height: '48px', backgroundColor: '#192873', color: 'white', fontWeight: 700, textTransform: 'capitalize', mt: 3 }}
              >
                View Organisations
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} padding="0 !important">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={logo} alt="3D Colleagues" style={{ width: '100%', maxWidth: '500px' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
