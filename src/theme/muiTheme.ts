import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
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
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
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