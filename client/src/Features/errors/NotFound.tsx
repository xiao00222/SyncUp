import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

function NotFound() {
 return(
    <>
    <Paper sx={{height:400,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,p:6}}>
     <SearchOff sx={{fontSize:100}} color="primary"/>
     <Typography gutterBottom variant="h3">
        Oops-Could not find what you are looking for
        </Typography>   
        <Button fullWidth component={Link} to='/activities'>
        Return to activities Page
        </Button>
    </Paper>
    </>
 )
}

export default NotFound;
