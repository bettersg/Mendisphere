import React from 'react';
import { Box, Typography, Container, Grid, Divider, Stack, IconButton } from '@mui/material';
import "../../pages/style.scss";
import { SocialType } from "../../data/Enums/social-type.enum";
import { GetIconForSocials } from "../../utilities/iconMappings/iconMapping";
import { Social } from "../../data/Model/OrganisationSummary";

const Footer: React.FC = () => {
  const socials: Social[] = [
    {
      socialType: SocialType.Youtube,
      url: "https://www.youtube.com/",
    },
    {
      socialType: SocialType.Facebook,
      url: "https://www.facebook.com/",
    },
    {
      socialType: SocialType.LinkedIn,
      url: "https://www.linkedin.com/",
    },
  ];

  // dynamically generate social icons based on organisation data
  const socialIconsView = socials.map((item, index) => (
    <IconButton key={index} href={item.url} target="_blank" rel="noopener noreferrer">
      {GetIconForSocials(item.socialType)}
    </IconButton>
  ));

  return (
    <Box id="footer" sx={{ backgroundColor: '#F5F5F5', py: 6}}>
      <Container className="page-width page-padding">
        <Stack spacing={3}>
          <Grid container spacing={3} width="100%">
            <Grid item xs={12} md={8} padding="0 !important">
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: '32px',
                  lineHeight: '39px',
                  letterSpacing: '-0.015em',
                  color: '#192873',
                }}
              >
                Mendisphere
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '27px',
                  letterSpacing: '-0.015em',
                  textAlign: 'justify',
                  marginTop: '16px',
                }}
              >
                Mendisphere aims to bring together mental health organizations and support non-profit mental health organizations who are struggling with resources and financial sustainability by increasing their visibility and supporting their fundraising efforts. Unlock the potential for mental wellness through nonprofit-corporate collaboration.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              {socialIconsView}
            </Grid>
          </Grid>

          <Box sx={{ py: 2 }}>
            <Divider sx={{ borderColor: '#CBCBCB', opacity: "30%" }} />
          </Box>


          <Grid container>
            <Grid item xs={12} md={6} padding="0 !important">
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '29px',
                  letterSpacing: '-0.015em',
                  color: '#707070',
                }}
                component="a"
                href="mailto:mendisphere@better.sg"
              >
                Contact us at mendisphere@better.sg
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '17px',
              letterSpacing: '-0.015em',
              color: '#707070',
              marginTop: '16px',
            }}
          >
            {`© ${new Date().getFullYear()} Mendisphere. All Rights Reserved.`}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
