import React from 'react';
import { Box, Breadcrumbs as MUIBreadcrumbs, Link, Typography, Container, IconButton } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { HomeIcon } from "@primer/octicons-react";
import { Organisation } from "../../data/Model/Organisation";
import { Paths } from "../../routing";

const currentPageStyle = {
  color: "#3959FF",
  textDecoration: "underline",
  fontWeight: "700",
};

const Breadcrumbs: React.FC<{ org?: Organisation }> = ({ org }) => {
  const isOrgProfilePage = org !== undefined;

  return (
    <Box sx={{ height: '6vh', marginBottom: 3, display: 'flex', alignItems: 'center' }}>
      <Container className="page-width page-padding">
        <MUIBreadcrumbs separator={<ChevronRightIcon sx={{ verticalAlign: 'middle' }} />} aria-label="breadcrumb" sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Home link */}
          <Link href="/" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon />

          </Link>

          {/* organisations page */}
          <Link
            href={isOrgProfilePage ? Paths.OrganisationListing : undefined}
            color={isOrgProfilePage ? "inherit" : "primary"}
            underline={isOrgProfilePage ? "hover" : "none"}
            sx={isOrgProfilePage ? undefined : currentPageStyle}
          >
            Organisations
          </Link>

          {/* organisation profile page */}
          {isOrgProfilePage && (
            <Typography color="primary" sx={currentPageStyle}>
              {org.name}
            </Typography>
          )}
        </MUIBreadcrumbs>
      </Container>
    </Box>
  );
};

export default Breadcrumbs;
