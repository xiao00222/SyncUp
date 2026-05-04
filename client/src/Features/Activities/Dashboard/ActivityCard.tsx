import { AccessTime, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import formatDate from "../../../lib/Util.util";
import AvatarPopover from "../../../App/Shared/Components/AvatarPopover";

type Props = {
  activity: Activity;
};
const ActivityCard = ({ activity }: Props) => {
  const label = activity.isHost ? "Your are Hosting" : "Your are going";
  const color = activity.isHost
    ? "secondary"
    : activity.isGoing
    ? "warning"
    : "default";
  return (
    <>
      <Card elevation={3} sx={{ borderRadius: 3 }}>

  {/* Stack header and chips vertically on mobile */}
  <Box display="flex" alignItems="center" justifyContent="space-between"
    sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
    <CardHeader
      avatar={<Avatar src={activity.hostImageUrl} alt="Image of host" sx={{ height: 80, width: 80 }} />}
      title={activity.title}
      titleTypographyProps={{ fontWeight: "bold", fontSize: 20 }}
      subheader={
        <>
          Hosted By{" "}
          <Link to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
        </>
      }
    />
    <Box display="flex" flexDirection="column" gap={2} sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 }, pl: { xs: 2, sm: 0 } }}>
      {(activity.isHost || activity.isGoing) && (
        <Chip variant="outlined" label={label} color={color} sx={{ borderRadius: 2 }} />
      )}
      {activity.isCancelled && (
        <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
      )}
    </Box>
  </Box>

  <Divider sx={{ mb: 3 }} />

  <CardContent sx={{ p: 0 }}>
    {/* Allow wrapping on small screens */}
    <Box display="flex" alignItems="center" mb={2} px={2}
      sx={{ flexWrap: 'wrap', gap: 1 }}>
      <Box display="flex" alignItems="center">
        <AccessTime sx={{ mr: 1 }} />
        <Typography variant="body2">{formatDate(activity.date)}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Place sx={{ mr: 1 }} />
        <Typography variant="body2">{activity.venue}</Typography>
      </Box>
    </Box>

    <Divider />

    <Box display="flex" gap={2} sx={{ backgroundColor: "grey.200", py: 3, pl: 3, flexWrap: 'wrap' }}>
      {activity.attendees.map((attendee) => (
        <AvatarPopover profile={attendee} key={attendee.id} />
      ))}
    </Box>
  </CardContent>

  {/* Stack description and button on mobile */}
  <CardActions sx={{ display: "flex", justifyContent: "space-between", pb: 2,
    flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1 }}>
    <Typography variant="body2">{activity.description}</Typography>
    <Button
      component={Link}
      to={`/activities/${activity.id}`}
      size="medium"
      variant="contained"
      sx={{ borderRadius: 3, alignSelf: { xs: 'flex-end', sm: 'auto' } }}
    >
      View
    </Button>
  </CardActions>
</Card>
    </>
  );
};

export default ActivityCard;
