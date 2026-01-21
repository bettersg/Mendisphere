import { Box, Stack } from '@mui/system';
import { Button } from '@mui/material';
import BreadcrumbsV2 from "../../components/BreadcrumbsV2"
import PersonIcon from '@mui/icons-material/Person';
import { ChevronLeft } from "@mui/icons-material";


export default function RegistrationTopBar() {
  return (
    <Stack spacing={2}>
      <Box>
        <Button onClick={()=>{window.history.back()}} startIcon={<ChevronLeft />} sx={{color:'text.primary'}}>BACK</Button>
      </Box>
      <BreadcrumbsV2 links={[{label: "Register", icon:<PersonIcon/>}]}/>
    </Stack>
  );
}