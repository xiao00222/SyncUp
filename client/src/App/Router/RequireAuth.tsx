import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/Hooks/useAccount"
import { Typography } from "@mui/material";

function RequireAuth() {
    const {currentUser,loadingUserInfo}=useAccount();
    const location=useLocation();
    if(loadingUserInfo) return <Typography>Loading....</Typography>
    if(!currentUser) return <Navigate to='/login' state={{from:location}}/>
      return (
    <Outlet/>
  )
}

export default RequireAuth