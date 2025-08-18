import  { Box, Typography } from "@mui/material"
import ActivityCard from "./ActivityCard"
import useActivities from "../../../lib/Hooks/useActivities";

const ActivityList = () => {
   const { activities, isLoading } = useActivities();
   if(!activities||isLoading) return <Typography>Loading...</Typography>
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:3}}>
        {activities.map(activity=>(
            //if need to return more thn one then we use {}
            <ActivityCard key={activity.id} activity={activity}
            />
        ))}
    </Box>
  )
}

export default ActivityList