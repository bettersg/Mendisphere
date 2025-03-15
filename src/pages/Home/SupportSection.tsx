import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, CardHeader } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import logoContribute from "../../assets/images/contribute.png";
import logoCollaborate from "../../assets/images/collaborate.png";
import logoVolunteer from "../../assets/images/volunteer.png";

const SupportSection = () => {
  const theme = useTheme();
  const isLargerThan768 = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ background: 'linear-gradient(0deg, #E0E5FF 43.75%, rgba(224, 229, 255, 0) 100%)', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" fontWeight="bold" gutterBottom sx={{ mb: '96px' }}>
          Support your way
        </Typography>
        <Grid container spacing={3} justifyContent="center" margin={"0 !important"}>
          <Grid item xs={12} md={4} padding={"0 24px 0 0 !important"}>
            <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
              <CardMedia
                component="img"
                image={logoContribute}
                alt="Contribute"
                sx={{ objectFit: 'contain', margin: '0 auto !important', height: 'auto !important', width: 'fit-content'}}
              />
              <CardHeader
                title={
                  <Typography variant="h5" fontSize={40} align="center" fontWeight="400" paddingTop="24px">
                    Contribute
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1" align="center">
                  Browse the wide array of non-profits furthering mental health outcomes, understand their story and impact, and contribute to those that speak to you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} padding={"0 24px 0 24px !important"}>
            <Card elevation={0} sx={{ backgroundColor: 'transparent'}}>
              <CardMedia
                component="img"
                image={logoCollaborate}
                alt="Collaborate"
                sx={{ objectFit: 'contain', margin: '0 auto !important', height: 'auto !important', width: 'fit-content' }}
              />
              <CardHeader
                title={
                  <Typography variant="h5" fontSize={40} align="center" fontWeight="400" paddingTop="24px">
                    Collaborate
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1" align="center">
                  Workshops? Trainings? Talks? Explore opportunities to partner with non-profits and leverage their vast expertise in the mental health space.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} padding={"0 0 0 24px !important"}>
            <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
              <CardMedia
                component="img"
                image={logoVolunteer}
                alt="Volunteer"
                sx={{ objectFit: 'contain', margin: '0 auto !important', height: 'auto !important', width: 'fit-content' }}
              />
              <CardHeader
                title={
                  <Typography variant="h5" fontSize={40} align="center" fontWeight="400" paddingTop="24px">
                    Volunteer
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1" align="center">
                  Make your CSR efforts count by volunteering with non-profits who need support in achieving their goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SupportSection;
