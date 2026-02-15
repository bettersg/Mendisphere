import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    mobile: true; // adds the `mobile` breakpoint
    desktop: true;
  }
  interface Palette {
    pending: Palette['primary'];
  }
  interface PaletteOptions {
    pending?: PaletteOptions['primary'];
  }
}

export const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      desktop: 640,
    },
  },
  palette: {
    primary: {
      main: "#3959FF",    // brand.primary
      dark: "#192873",    // interaction.active (Hover states usually use dark)
      light: "#879BFF",   // interaction.focus
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#192873",    // brand.secondary
    },

    text: {
      primary: "#333333", 
      secondary: "#707070",
      disabled: "#CBCBCB", 
    },
    background: {
      default: "#F5F5F5",   
      paper: "#FFFFFF",     
    },

    error: {
      main: "#FF3939",      // focus.error
      dark:'#E20000',
      light: "#FFEFEF",     // focus.errorHighlight (Good for Alert backgrounds)
    },
    success: {
      main: "#79BD92",      // focus.success
      dark:'#15843E',
      light: "#9FF8BF",     // focus.successHighlight
    },
    pending:{
      main:"#FFD0B6"
    }
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    h1:{
      fontWeight:'600',
    },
    h2:{
      fontWeight:'600',
    },
    h3:{
      fontWeight:'600',
    },
    h4:{
      fontWeight:'600',
    },
    h5:{
      fontWeight:'600',
    },
    h6:{
      fontWeight:'600',
    }
  },
  components: {
    MuiToggleButton:{
      styleOverrides:{
        root: ({ theme }) => ({
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
            "&.Mui-selected:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
        })

      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});