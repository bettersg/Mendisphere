import { Box,Container,Stack} from '@mui/system';
import * as React from 'react';
import Typography from "@mui/material/Typography";
import { Link,IconButton,Button,FormControl, TextField, InputAdornment} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BreadcrumbsV2 from "../../components/BreadcrumbsV2"
import PersonIcon from '@mui/icons-material/Person';
import { muiTheme } from '../../theme/muiTheme';
import { ChevronLeft, PersonSharp } from "@mui/icons-material";

type TopBarProps = {
  links: { label?: string; href?: string; icon?: JSX.Element | null }[];
};



export default function TopBar({ links }: TopBarProps) {
  return (
    <Stack spacing={2}>
      <Box>
      <Button onClick={()=>{window.history.back()}} startIcon={<ChevronLeft />} sx={{color:'text.primary'}}>BACK</Button>
      </Box>
      <BreadcrumbsV2 links={links}/>
    </Stack>
  );
}
