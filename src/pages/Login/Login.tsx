
import { Box,Container} from '@mui/system';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginDesign from "./LoginDesign";
import LoginSection from "./LoginSection";
import "./style.scss";

const Login = () => {
  return (
    <Box sx={{minHeight:"100vH", display:'flex', height:'100%'}}>
      <Box sx={{flex:"1"}}>
        <Button variant="text"><ArrowBackIosIcon/>Back</Button>
      </Box>
      <Box className="rounded_edge_rectangle" sx={{flex:"1", alignContent:'center', display:'flex', justifyContent:'center'}}>
        <img src="/images/login.png" style={{ width:"70%", height:"auto", objectFit:"contain"}}/>
      </Box>
    </Box>
  );
};

export default Login;
