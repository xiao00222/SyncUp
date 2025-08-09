import  { Grid2,  } from "@mui/material"
import ActivityList from "./ActivityList";
import { ActivityDetails } from "../Details/ActivityDetails";
import Activityform from "../form/Activityform";
type Props={
    activities:Activity [];
    selectActivity:(id:string)=>void;
    cancelSelectActivity:()=>void;
    selectedActivity?:Activity;
    openForm:(id?:string)=>void;
    closeForm:()=>void;
    editMode:boolean;
    submitForm:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
}

export const ActivityDashboard = 
({activities,selectActivity,cancelSelectActivity,selectedActivity,openForm,closeForm,editMode,submitForm,deleteActivity}:Props) => {
  return (
    <>
    <Grid2 container spacing={3}>    
    <Grid2 size={7} maxWidth='xl' >
       <ActivityList activities={activities} selectActivity={selectActivity}
       deleteActivity={deleteActivity}
      />
    </Grid2>
    <Grid2 size={5}>
    {selectedActivity && !editMode &&
    <ActivityDetails activity={selectedActivity}
      cancelSelectActivity={cancelSelectActivity}
      openForm={openForm}
    />
    }
    {editMode && 
    <Activityform closeForm={closeForm} activity={selectedActivity} submitForm={submitForm} />}
    </Grid2>
    </Grid2>
    </>
  )
}
