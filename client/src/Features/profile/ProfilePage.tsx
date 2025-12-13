import { Grid2, Typography } from "@mui/material";
import ProfileHeader from "./profileHeader";
import ProfileContent from "./profileContent";
import {  useParams } from "react-router";
import { useProfile } from "../../lib/Hooks/useProfile";

function ProfilePage() {
  const {id}=useParams();
  const {profile,isLoadingProfile}=useProfile(id);
  if (isLoadingProfile) return <Typography>Loading Profile...</Typography>
  if (!profile) return <Typography>Profile not found</Typography>
  return(
  <>
    <Grid2 container>
      <Grid2 size={12}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid2>
    </Grid2>
  </>
  )
}

export default ProfilePage;
