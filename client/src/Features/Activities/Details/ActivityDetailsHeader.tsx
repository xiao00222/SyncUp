import { Card, CardMedia, Box, Typography, Chip } from "@mui/material"
import { Link } from "react-router";
import formatDate from "../../../lib/Util.util";
import useActivities from "../../../lib/Hooks/useActivities";
import StyledButton from "../../../App/Shared/Components/StyledButton";
type Props={
activity:Activity
}
export default function ActivityDetailsHeader({activity}:Props) {
    const {updateAttendance}=useActivities(activity.id);

   return (
    <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
        {activity.isCancelled && (
            <Chip
                sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000, borderRadius: 1 }}
                color="error"
                label="Cancelled"
            />
        )}
        <CardMedia
            component="img"
            sx={{ height: { xs: 200, sm: 260, md: 300 } }}
            image={`/images/categoryImages/${activity.category}.jpg`}
            alt={`${activity.category} image`}
        />
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'flex-end' },
                gap: { xs: 1.5, sm: 0 },
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}
        >
            {/* Text Section */}
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.125rem' },
                    }}
                >
                    {activity.title}
                </Typography>
                <Typography variant="subtitle1">{formatDate(activity.date)}</Typography>
                <Typography variant="subtitle2">
                    Hosted by{' '}
                    <Link to={`/profiles/${activity.hostId}`} style={{ color: 'white', fontWeight: 'bold' }}>
                        {activity.hostDisplayName}
                    </Link>
                </Typography>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {activity.isHost ? (
                    <>
                        <StyledButton
                            variant="contained"
                            color={activity.isCancelled ? 'success' : 'error'}
                            onClick={() => updateAttendance.mutate(activity.id)}
                            disabled={updateAttendance.isPending}
                        >
                            {activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                        </StyledButton>
                        <Link to={`/manage/${activity.id}`}>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                disabled={activity.isCancelled}
                            >
                                Manage Event
                            </StyledButton>
                        </Link>
                    </>
                ) : (
                    <StyledButton
                        variant="contained"
                        color={activity.isGoing ? 'primary' : 'info'}
                        onClick={() => updateAttendance.mutate(activity.id)}
                        disabled={updateAttendance.isPending || activity.isCancelled}
                    >
                        {activity.isGoing ? 'Cancel Attendance' : 'Join Activity'}
                    </StyledButton>
                )}
            </Box>
        </Box>
    </Card>
);
}