import { useEffect, useMemo, useState } from "react";
import { useController, type UseControllerProps, type FieldValues } from "react-hook-form";
import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import axios from "axios";
type Props<T extends FieldValues> = {
    label:string
}&UseControllerProps<T>

//making props generic to work with anytype
const LocationInput = <T extends FieldValues>(props: Props<T>) => {
  const { field, fieldState } = useController(props);
    const [loading,setLoading]=useState(false);
    const [suggestions,setSuggestions]=useState<LocationIQSuggestion[]>([]);
    const [inputValue,setInputValue]=useState(field.value || '');
    useEffect(()=>
    {
        if(field.value && typeof field.value=== 'object')
        {
            setInputValue(field.value.venue||'');
        }
        else
        {
            setInputValue(field.value ||'');
        }
    },[field.value])
    const LocationUrl="https://api.locationiq.com/v1/autocomplete?key=pk.5eddb8ca8d5cc1e0c363d9ee29fbfded&q=tower%20of%20lo%20&limit=5&dedupe=1&"
    const fetchsuggestions=useMemo(
        () => debounce(async (query:string)=>{
            if(!query||query.length<3)
            {
                setSuggestions([]);
                return;
            }
            setLoading(true);
            try {
                const response=await axios.get<LocationIQSuggestion[]>(`${LocationUrl}q=${query }`);
                setSuggestions(response.data);
            } catch (error) {
                console.log(error)
            }
            finally 
            {
                setLoading(false);
            }
        },500),[LocationUrl]
    )
    const handleChange=async (value:string)=>{
        field.onChange(value)
        await fetchsuggestions(value); 
    }
    const handleSelect=(location:LocationIQSuggestion)=>
    {
        const city=location.address.city || location.address.town||location.address.village;
        const venue=location.display_name;
        const lattitude=location.lat;
        const longitude= location.lon;
        setInputValue(venue);
        field.onChange({city,venue,lattitude,longitude});
        setSuggestions([]);

    }
  return (
   <>
   <Box>
    <TextField
    {...props}
    value={inputValue}
    onChange={e=>handleChange(e.target.value)}
    fullWidth
    variant="outlined"
    error={!!fieldState.error}
    helperText={fieldState.error?.message}

    />
    {loading && <Typography>Loading...</Typography>}
    {suggestions.length>0 &&(
        <List sx={{border:1}}>
        {suggestions.map(suggestion=>(
            <ListItemButton
            divider
            key={suggestion.place_id}
            onClick={()=> handleSelect(suggestion)}
            >
             {suggestion.display_name}   
            </ListItemButton>
        ))}
        </List>
    )}
   </Box>
   </>
  );
};

export default LocationInput;
