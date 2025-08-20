import { Group } from "@mui/icons-material"
import { Box, Button, Paper, Typography } from "@mui/material"
import { Link } from "react-router"

const HomepPage = () => {
  return (
   <Paper square sx={{
    color:'white',
    display:"flex",
    flexDirection:'column',
    alignItems:'center',
    gap:6,
    alignContent:'center',
    justifyContent:'center',
    height:'100vh',
   backgroundImage:'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a78c 89%)'
   }}>
    <Box sx={{display:'flex',alignItems:'center',alignContent:'center', color:'white',gap:3}}>
      <Group sx={{height:110,width:110}}/>
      <Typography variant="h1">SyncUp</Typography> 
    </Box>
    <Typography variant="h2">Welcome To SyncUp</Typography>
    <Button component={Link} to='/activities' size='large' variant="contained" 
    sx={{height:80,fontSize:'1.5rem',borderRadius:4}}>Take me to the Activities!</Button>
   </Paper>
  )
}

export default HomepPage