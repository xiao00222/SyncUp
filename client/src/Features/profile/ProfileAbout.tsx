import { useParams } from "react-router";
import { useProfile } from "../../lib/Hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";

function ProfileAbout() {
  const { id } = useParams();
  const { profile } = useProfile(id);
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">About {profile?.displayName}</Typography>
          <Button>Edit Profile</Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ overflow: "auto", maxHeight: 350 }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {profile?.bio || "No Description Added yet"}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ProfileAbout;
