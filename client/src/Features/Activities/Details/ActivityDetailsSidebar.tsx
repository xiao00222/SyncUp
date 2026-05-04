import {
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid2,
} from "@mui/material";
type Props = {
  activity: Activity;
};
export default function ActivityDetailsSidebar({ activity }: Props) {
  return (
    <>
        <Paper
            sx={{
                textAlign: "center",
                border: "none",
                backgroundColor: "primary.main",
                color: "white",
                p: 2,
            }}
        >
            <Typography variant="h6">
                {activity.attendees.length} people are going
            </Typography>
        </Paper>
        <Paper sx={{ padding: 2 }}>
            {activity.attendees.map((attendee) => (
                <Grid2 key={attendee.id} container alignItems="center">
                    <Grid2 size={{ xs: 12, sm: 8 }}>
                        <List sx={{ display: "flex", flexDirection: "column" }}>
                            <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{ width: { xs: 50, sm: 75 }, height: { xs: 50, sm: 75 }, mr: 2 }}
                                        alt={attendee.displayName + ' image'}
                                        src={attendee.imageUrl}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h6" sx={{ fontSize: { xs: '0.95rem', sm: '1.25rem' } }}>
                                        {attendee.displayName}
                                    </Typography>
                                    {attendee.following && (
                                        <Typography variant="body2" color="orange">
                                            Following
                                        </Typography>
                                    )}
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, sm: 4 }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: 'flex-start', sm: 'flex-end' },
                            pl: { xs: 2, sm: 0 },
                            pb: { xs: 1, sm: 0 },
                            gap: 1,
                        }}
                    >
                        {activity.hostId === attendee.id && (
                            <Chip
                                label="Host"
                                color="warning"
                                variant="filled"
                                sx={{ borderRadius: 2 }}
                            />
                        )}
                    </Grid2>
                </Grid2>
            ))}
        </Paper>
    </>
);
}
