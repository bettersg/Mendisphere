import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box,Container } from '@mui/material';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Homepage_Breadcrumbs() {
  return (
    <Box sx={{ height: '6vh', display: 'flex', alignItems: 'center' }}>
      <Container className="page-width page-padding">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography sx={{ color: 'primary.main' }}>Organisations</Typography>
      </Breadcrumbs>
      </Container>
    </Box>
  );
}