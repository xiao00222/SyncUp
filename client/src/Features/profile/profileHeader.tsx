import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/Hooks/useProfile";


 function ProfileHeader() {
  const {id}=useParams();
  const {profile,isCurrentUser,updateFollowing  }=useProfile(id);
  if(!profile) return null;
  return (
  <>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 8 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={profile.imageUrl}
              alt="Profile pic"
              sx={{ width: { xs: 80, sm: 150 }, height: { xs: 80, sm: 150 } }}
            />
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', sm: '2.125rem' } }}>
                {profile.displayName}
              </Typography>
              {profile.following && (
                <Chip
                  variant="outlined"
                  color="secondary"
                  label="Following"
                  sx={{ borderRadius: 1 }}
                />
              )}
            </Box>
          </Stack>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 4 }} alignItems="center">
          <Stack spacing={2} alignItems="center">
            <Box display="flex" justifyContent="space-around" width="100%">
              <Box textAlign="center">
                <Typography variant="h6">Followers</Typography>
                <Typography variant="h5">{profile.followerCount}</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6">Following</Typography>
                <Typography variant="h5">{profile.followingCount}</Typography>
              </Box>
            </Box>
            {!isCurrentUser && (
              <>
                <Divider sx={{ width: "100%" }} />
                <Button
                  variant="outlined"
                  fullWidth
                  color={profile.following ? "error" : "success"}
                  onClick={() => updateFollowing.mutate()}
                  disabled={updateFollowing.isPending}
                >
                  {profile.following ? "Unfollow" : "Follow"}
                </Button>
              </>
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Paper>
  </>
);
}
export default ProfileHeader;

