import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import type { FormEvent } from "react";
import useActivities from "../../../lib/Hooks/useActivities";
import { useNavigate, useParams } from "react-router";
const Activityform = () => {
  const {id}=useParams()
  const {updateActivities,CreateActivities,activity,isLoadingActivity}=useActivities(id);
  const navigate=useNavigate();
  const handleSubmit= async (event:FormEvent<HTMLFormElement>)=>
  {
    event.preventDefault();
    const formData= new FormData(event.currentTarget);
    const data:{[key:string]:FormDataEntryValue}={}
    formData.forEach((value,key)=>
    { 
      data[key]=value;
    });
    if(activity) 
    {
        data.id=activity.id;
      await updateActivities.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`);
    }
    else
    {
      await CreateActivities.mutate(data as unknown as Activity,{
        onSuccess: (id)=>{
          navigate(`/activities/${id}`)
        }
      })
    }

  }
  if(isLoadingActivity) return<Typography>Loading Activity....</Typography>
  return (
    <Paper sx={{borderRadius:3,padding:3}}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity? "Edit Activity":"Create Activity"}</Typography>
      <Box component='form' onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField name="title" label='Title' defaultValue={activity?.title}/>
        <TextField name="description" label='Description' defaultValue={activity?.description} multiline rows={3}/>
        <TextField name="Category" label='Category'defaultValue={activity?.category}/>
    {/* If date exists then split and use yy-mm--dd else use todays date */}
        <TextField name="date"  type="date"defaultValue={activity?.date? new Date(activity.date).toISOString().split('T')[0]
          :new Date().toISOString().split('T')[0]
        }
        
        />
        <TextField name="city" label='City'defaultValue={activity?.city}/>
        <TextField name="venue" label='Venue'defaultValue={activity?.venue}/>
        <Box display='flex' justifyContent='end' gap={3}></Box>
        <Button color="inherit">Cancel</Button>
        <Button type="submit" color='success' variant="contained" disabled={updateActivities.isPending || CreateActivities.isPending}>Submit</Button>
      </Box>
    </Paper>
  )
}

export default Activityform