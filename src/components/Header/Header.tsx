import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Container,
  Stack
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/Logo.svg";

const Header = () => {
  const menuItems = [
    { text: "About", link: "footer" },
    { text: "Organisations", link: "/organisations" },
    // { text: "Grants", link: "footer" },
    // { text: "Consultants", link: "footer" },
    { text: "Contact", link: "footer" },
  ];

  const location=useLocation()

  const isActive=(link:string)=>{
    if (link==="footer"){
      return false;
    }
    return location.pathname.startsWith(link)
  }

  const handleScroll = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: string,
  ) => {
    event.preventDefault();
    
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
      <Container sx={{maxWidth:"1200px"}}>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            component={RouterLink}
            to="/"
            aria-label="menu"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <img src={logo} alt="Logo" />
          </IconButton>
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
                sx={{ marginLeft: "10px", textTransform: "capitalize",
                  color:isActive(item.link)?"primary.main":"inherit"
                }}
              >
                {item.text}
              </Button>
            ),
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={"row"} gap={2}>
            <Button color="primary" component={RouterLink} to={"/login"} variant="contained">
              LOGIN
            </Button>
            <Button color="primary" component={RouterLink} to={"/registration"} variant="outlined">
              REGISTER
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
