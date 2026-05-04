import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import formatDate from "../../../lib/Util.util";
import { useState } from "react";
import MapComponent from "../../../App/Shared/Components/MapComponent";
type Props={
    activity:Activity
}
export default function ActivityDetailsInfo({activity}:Props) {
    const [mapOpen,SetMapOpen]=useState(false)
    return (
    <Paper sx={{ mb: 2 }}>
        <Grid2 container alignItems="center" pl={2} py={1}>
            <Grid2 size={{ xs: 2, sm: 1 }}>
                <Info color="info" fontSize="large" />
            </Grid2>
            <Grid2 size={{ xs: 10, sm: 11 }}>
                <Typography>{activity.description}</Typography>
            </Grid2>
        </Grid2>
        <Divider />

        <Grid2 container alignItems="center" pl={2} py={1}>
            <Grid2 size={{ xs: 2, sm: 1 }}>
                <CalendarToday color="info" fontSize="large" />
            </Grid2>
            <Grid2 size={{ xs: 10, sm: 11 }}>
                <Typography>{formatDate(activity.date)}</Typography>
            </Grid2>
        </Grid2>
        <Divider />

        <Grid2 container alignItems="center" pl={2} py={1}>
            <Grid2 size={{ xs: 2, sm: 1 }}>
                <Place color="info" fontSize="large" />
            </Grid2>
            <Grid2
                size={{ xs: 10, sm: 11 }}
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                gap={0.5}
            >
                <Typography>
                    {activity.venue}, {activity.city}
                </Typography>
                <Button onClick={() => SetMapOpen(!mapOpen)}>
                    {mapOpen ? 'Hide Map' : 'Show Map'}
                </Button>
            </Grid2>
        </Grid2>

        {mapOpen && (
            <Box sx={{ height: 400, zIndex: 1000, display: 'block' }}>
                <MapComponent
                    position={[activity.lattitude, activity.longitude]}
                    venue={activity.venue}
                />
            </Box>
        )}
    </Paper>
);
}
