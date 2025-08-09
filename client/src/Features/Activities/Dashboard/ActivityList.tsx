import  { Box } from "@mui/material"
import ActivityCard from "./ActivityCard"
type Props={
    activities:Activity[];
    selectActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void
}
const ActivityList = ({activities,selectActivity,deleteActivity}:Props) => {
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:3}}>
        {activities.map(activity=>(
            //if need to return more thn one then we use {}
            <ActivityCard key={activity.id} activity={activity}
            selectActivity={selectActivity}
            deleteActivity={deleteActivity}
            />
        ))}
    </Box>
  )
}

export default ActivityList