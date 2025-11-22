import { Box, Button, Paper, Typography } from "@mui/material"
import useActivities from "../../../lib/Hooks/useActivities";
import {  useNavigate, useParams } from "react-router";
import { useForm, type Resolver } from 'react-hook-form'
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/Schema/ActivitySchema";
import {zodResolver} from '@hookform/resolvers/zod'
import TextInput from "../../../App/Shared/Components/TextInput";
// Removed duplicate import of useForm
import SelectInput from "../../../App/Shared/Components/SelectInput";
import { CategoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../App/Shared/Components/DateTimeInput";
import LocationInput from "../../../App/Shared/Components/LocationInput";
const Activityform = () => {
  const {reset,control,handleSubmit}=useForm<ActivitySchema>({
      mode:'onTouched',
           resolver: zodResolver(activitySchema) as unknown as Resolver<ActivitySchema>
    }
  );
  const navigate=useNavigate();
  const {id}=useParams()
  const {updateActivities,CreateActivities,activity,isLoadingActivity}=useActivities(id);
  useEffect(()=>
  {
    if(activity) reset ({
      ...activity,
      location:
      {
        city:activity.city,
        venue:activity.venue,
        lattitude:activity.lattitude,
        longitude:activity.longitude
      }
    })
  },[activity,reset])
  const onSubmit= async (data:ActivitySchema)=>
  {
    const {location,...rest}=data;
    const flattenedData={...rest,...location};
    try {
      if(activity)
      {
        updateActivities.mutate({...activity,...flattenedData},{
          onSuccess:()=>
          {
            navigate(`/activities/${activity.id}`)
          }
        }
      )
      }
      else{
        CreateActivities.mutate(flattenedData as Omit<Activity,'id'|'isCancelled'>,{
          onSuccess:(id)=>
          {
             navigate(`/activities/${id}`) 
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
    
   
  }
  if(isLoadingActivity) return<Typography>Loading Activity....</Typography>
  return (
    <Paper sx={{borderRadius:3,padding:3}}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity? "Edit Activity":"Create Activity"}</Typography>
       <Box component='form' onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
       <TextInput label='Title'control={control} name="title"/>
       <TextInput label='Description'control={control} name="description"/>
       <Box display='flex' gap={3}>
        <SelectInput label='Category' control={control} name="category" items={CategoryOptions}/>
       <DateTimeInput label='Date'control={control} name="date"/>
       </Box>
       <LocationInput control={control} label="Enter the Location" name="location" />
        <Box display='flex' justifyContent='end' gap={3}></Box>
        <Button color="inherit">Cancel</Button>
        <Button type="submit" color='success' variant="contained" disabled={updateActivities.isPending || CreateActivities.isPending}>Submit</Button>
      </Box>
    </Paper>
  )
}

export default Activityform