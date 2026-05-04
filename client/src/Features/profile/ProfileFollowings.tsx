import { useParams } from "react-router";
import { useProfile } from "../../lib/Hooks/useProfile";
import { Box, Divider, Typography } from "@mui/material";
import Profilecards from "./profileCards";

type Props = {
  activeTab: number;
};
function ProfileFollowings({ activeTab }: Props) {
  const { id } = useParams();
  const predicate = activeTab === 3 ? "followers" : "followings ";
  const { profile, followings, loadingFollowings } = useProfile(id, predicate);
 return (
  <Box>
    <Box display="flex">
      <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
        {activeTab === 3
          ? `People Following ${profile?.displayName}`
          : `People ${profile?.displayName} is following`}
      </Typography>
    </Box>
    <Divider sx={{ my: 2 }} />
    {loadingFollowings ? (
      <Typography>Loading...</Typography>
    ) : (
      <Box display="flex" flexWrap="wrap" marginTop={3} gap={3}>
        {followings?.map((profile) => (
          <Profilecards key={profile.id} profile={profile} />
        ))}
      </Box>
    )}
  </Box>
);
}

export default ProfileFollowings;
