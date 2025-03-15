import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from "../../assets/images/logo/Logo.svg";

const Header = () => {
  const menuItems = [
    { text: 'About', link: 'footer' },
    { text: 'Organisations', link: '/organisations' },
    { text: 'Contact Us', link: 'footer' },
  ];

  const handleScroll = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, link: string) => {
    event.preventDefault();
    const element = document.getElementById(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #D3D3D3', boxShadow: 'none' }}>
      <Container maxWidth={false} disableGutters sx={{ maxWidth: '1440px', paddingLeft: '120px', paddingRight: '120px' }}>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <img src={logo} alt="Logo" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {menuItems.map((item, index) => (
            item.link === 'footer' ? (
              <Button
                key={index}
                color="inherit"
                onClick={(event) => handleScroll(event, item.link)}
                sx={{ marginLeft: '10px', textTransform: 'capitalize' }}
              >
                {item.text}
              </Button>
            ) : (
              <Button
                key={index}
                color="inherit"
                component={RouterLink}
                to={item.link}
                sx={{ marginLeft: '10px', textTransform: 'capitalize' }}
              >
                {item.text}
              </Button>
            )
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;