import { ThemeProvider, createTheme } from "@mui/material/styles";
export const muiTheme = createTheme({
    palette:{
        primary:{
            main:'#3959FF'
        },
        secondary:{
            main:'#192873'
        },
        error:{
            main:'#FF3939'
        },
        success:{
            main:'#25BB5C'
        }
    },
    typography:{
        fontFamily:
            'Inter, sans-serif',
    }
});