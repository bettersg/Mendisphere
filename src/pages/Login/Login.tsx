
import { Box,Container} from '@mui/system';
import Typography from "@mui/material/Typography";
import { Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginDesign from "./LoginDesign";
import LoginSection from "./LoginSection";
import "./style.scss";

const Login = () => {
  return (
    <Box sx={{minHeight:"100vH", display:'flex', height:'100%'}}>
      <Box sx={{flex:"1"}}>
        <Button variant="text" sx={{color:'text.primary'}}><ArrowBackIosIcon/>Back</Button>
        <Typography variant='h3'>Get connected 🚀</Typography>
      </Box>
      <Box className="rounded_edge_rectangle" sx={{flex:"1", alignContent:'center', display:'flex', justifyContent:'center'}}>
        <img src="/images/login.png" style={{ width:"70%", height:"auto", objectFit:"contain"}}/>
      </Box>
    </Box>
  );
};

export default Login;
