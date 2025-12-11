import { Box,Container,Stack} from '@mui/system';

export default function LoginDesign() {
  return (
      <Box className="rounded_edge_rectangle" sx={{width:'50%', flex:"1", alignContent:'center', display:'flex', justifyContent:'center'}}>
        <img src="/images/login.png" style={{ width:"40%", height:"auto", objectFit:"contain"}}/>
      </Box>
  );
}
