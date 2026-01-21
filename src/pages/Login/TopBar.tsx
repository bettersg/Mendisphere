import { Box, Stack } from '@mui/system';
import { Button } from '@mui/material';
import BreadcrumbsV2 from "../../components/BreadcrumbsV2"
import { ChevronLeft } from "@mui/icons-material";

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
