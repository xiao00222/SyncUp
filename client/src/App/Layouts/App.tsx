import { useEffect, useState } from "react"
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { NavBar } from "./NavBar";
import { ActivityDashboard } from "../../Features/Activities/Dashboard/ActivityDashboard";
function App() {
  const [activities,setactivities]= useState<Activity[]>([]);
  const [selectedactivity,setselectedactivity]=useState<Activity|undefined>(undefined);
  const [editMode,setEditMode]=useState(false);
  useEffect(()=>
{
  axios.get<Activity[]>("https://localhost:5001/api/activities")
  .then(response=>setactivities(response.data))
},[])
const handleSelectActivity=(id:string)=>
{
  setselectedactivity(activities.find(x=>x.id===id));
}
const handleCancelSelectActivity=()=>
{
  setselectedactivity(undefined);
}
const handleOpenForm=(id?:string)=>
{
  if(id) handleSelectActivity(id);
  else handleCancelSelectActivity();
  setEditMode(true); 

}
const handleFormClose=()=>
{
  setEditMode(false);
}
const handleSubmit=(activity:Activity)=>
{
  if(activity.id){
    setactivities(activities.map(x=>x.id===activity.id?activity:x))
  }
  else
  {
    const newActivity={...activity,id:activities.length.toString()}
    setselectedactivity(newActivity)
    setactivities([...activities,newActivity])
  }
  setEditMode(false); 
}
const handleDelete=(id:string)=>
{
  setactivities(activities.filter(x=>x.id!=id));
}
  return (
    <Box sx={{bgcolor:'grey.300'}}>
    <CssBaseline/>
    <NavBar openForm={handleOpenForm}/>
    <Container  sx={{mt:8}}>
    <ActivityDashboard activities={activities}
    selectActivity={handleSelectActivity}
    cancelSelectActivity={handleCancelSelectActivity}
    selectedActivity={selectedactivity}
    editMode={editMode}
    openForm={handleOpenForm}
    closeForm={handleFormClose}
    submitForm={handleSubmit}
    deleteActivity={handleDelete}
    />
    </Container>
    </Box>
  )
}

export default App