import { Box,Container,Stack} from '@mui/system';
import * as React from 'react';
import Typography from "@mui/material/Typography";
import { Link,IconButton,Button,FormControl, TextField, InputAdornment} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function LoginTopBar() {
  return (
    <Box>
      <Button variant="text" sx={{color:'text.primary'}}><ArrowBackIosIcon/>Back</Button>
    </Box>
  );
}
