import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Container,
  Stack,
  Drawer,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/Logo.svg";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: "About", link: "footer" },
    { text: "Organisations", link: "/organisations" },
    // { text: "Grants", link: "footer" },
    // { text: "Consultants", link: "footer" },
    { text: "Contact", link: "footer" },
  ];

  const location = useLocation();

  const isActive = (link: string) => {
    if (link === "footer") {
      return false;
    }
    return location.pathname.startsWith(link);
  };

  const handleScroll = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    link: string,
  ) => {
    event.preventDefault();
    setDrawerOpen(false);
    const element = document.getElementById(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #D3D3D3",
        boxShadow: "none",
      }}
    >
      <Container sx={{ maxWidth: "1200px" }}>
        <Toolbar disableGutters>
          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { mobile: "flex", desktop: "none" }, mr: 3}}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            edge="start"
            color="inherit"
            component={RouterLink}
            to="/"
            aria-label="home"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <img src={logo} alt="Logo" />
          </IconButton>

          {/* Desktop nav */}
          <Box sx={{ display: { mobile: "none", desktop: "flex" } }}>
            {menuItems.map((item, index) =>
              item.link === "footer" ? (
                <Button
                  key={index}
                  color="inherit"
                  onClick={(event) => handleScroll(event, item.link)}
                  sx={{ marginLeft: "10px", textTransform: "capitalize" }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  key={index}
                  color="inherit"
                  component={RouterLink}
                  to={item.link}
                  sx={{
                    marginLeft: "10px",
                    textTransform: "capitalize",
                    color: isActive(item.link) ? "primary.main" : "inherit",
                  }}
                >
                  {item.text}
                </Button>
              ),
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop auth buttons */}
          <Stack direction="row" gap={2} sx={{ display: { mobile: "none", desktop: "flex" } }}>
            <Button color="primary" component={RouterLink} to="/login" variant="contained">
              LOGIN
            </Button>
            <Button color="primary" component={RouterLink} to="/registration" variant="outlined">
              REGISTER
            </Button>
          </Stack>

        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 260 } } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/"
            onClick={() => setDrawerOpen(false)}
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
          >
           
          </IconButton>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack direction="column" sx={{ px: 3, py: 2 }} gap={2}>
          <img src={logo} alt="Logo" style={{ marginBottom: "16px" }}/>
          {menuItems.map((item, index) =>
            item.link === "footer" ? (
              <Button
                key={index}
                color="inherit"
                onClick={(event) => handleScroll(event, item.link)}
                sx={{ textTransform: "capitalize", justifyContent: "flex-start" }}
              >
                {item.text}
              </Button>
            ) : (
              <Button
                key={index}
                color="inherit"
                component={RouterLink}
                to={item.link}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  textTransform: "capitalize",
                  justifyContent: "flex-start",
                  color: isActive(item.link) ? "primary.main" : "inherit",
                }}
              >
                {item.text}
              </Button>
            )
          )}
        </Stack>
        <Divider />
        <Stack direction="column" gap={2} sx={{ p: 2 }}>
          <Button
            color="primary"
            component={RouterLink}
            to="/login"
            variant="contained"
            fullWidth
            onClick={() => setDrawerOpen(false)}
          >
            LOGIN
          </Button>
          <Button
            color="primary"
            component={RouterLink}
            to="/registration"
            variant="outlined"
            fullWidth
            onClick={() => setDrawerOpen(false)}
          >
            REGISTER
          </Button>
        </Stack>
      </Drawer>
    </AppBar>
  );
};

export default Header;
