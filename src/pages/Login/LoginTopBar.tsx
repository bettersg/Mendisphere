import { Box,Container,Stack} from '@mui/system';
import * as React from 'react';
import Typography from "@mui/material/Typography";
import { Link,IconButton,Button,FormControl, TextField, InputAdornment} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BreadcrumbsV2 from "../../components/BreadcrumbsV2"
import PersonIcon from '@mui/icons-material/Person';
import { muiTheme } from '../../theme/muiTheme';

export default function LoginTopBar() {
  return (
    <Stack spacing={2}>
      <Box>
      <Button variant="text" onClick={()=>{window.history.back()}} sx={{color:'text.primary'}}><ArrowBackIosIcon/>Back</Button>
      </Box>
      <BreadcrumbsV2 links={[{label: "Login", icon:<PersonIcon/>}]}/>
    </Stack>
  );
}
