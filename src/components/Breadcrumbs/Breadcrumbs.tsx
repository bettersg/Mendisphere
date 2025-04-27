import React from 'react';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { HomeIcon } from "@primer/octicons-react";
import { Box, Breadcrumbs as MUIBreadcrumbs, Link, Typography, Container } from '@mui/material';

interface BreadcrumbItem {
  name: string;
  link?: string;
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  // Prepend the "Home" link with an icon
  const updatedBreadcrumbs = [{ name: 'Home', link: '/' }, ...breadcrumbs];

  return (
    <Box sx={{ pt: 3, pb: 3, display: 'flex', alignItems: 'center' }}>
      <Container className="page-width page-padding">
        <MUIBreadcrumbs
          separator={<ChevronRightIcon sx={{ verticalAlign: 'middle' }} />}
          aria-label="breadcrumb"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {updatedBreadcrumbs.map((breadcrumb, index) => {
            const isLast = index === updatedBreadcrumbs.length - 1;

            if (index === 0) {
              return (
                <Link
                  key={index}
                  href={breadcrumb.link}
                  color="inherit"
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <HomeIcon />
                </Link>
              );
            }

            if (isLast) {
              return (
                <Typography
                  key={index}
                  color="primary"
                  sx={{
                    color: '#3959FF',
                    textDecoration: 'underline',
                    fontWeight: '700',
                  }}
                >
                  {breadcrumb.name}
                </Typography>
              );
            }

            return (
              <Link
                key={index}
                href={breadcrumb.link}
                color="inherit"
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {breadcrumb.name}
              </Link>
            );
          })}
        </MUIBreadcrumbs>
      </Container>
    </Box>
  );
};

export default Breadcrumbs;
