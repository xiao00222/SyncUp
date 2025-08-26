import { Box, Button, ButtonGroup, List, ListItem, Typography } from "@mui/material"
import useStore from "../../lib/Hooks/useStore"
import {observer} from 'mobx-react-lite'

const Counter= observer(function Counter() {
    const {counterStore}=useStore()
  return (
    <Box display='flex' justifyContent='space-between' minHeight="100vh"> 
    <Box sx={{width:'60%'}}>
    <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
            <Typography variant="h6" gutterBottom>{counterStore.count}</Typography>
    <ButtonGroup sx={{mt:3}}>
        <Button variant="contained" color="error" onClick={()=>counterStore.decrement()}>Decrement</Button>
        <Button variant="contained" color="success" onClick={()=>counterStore.increment()}>increment</Button>
        <Button variant="contained" color="primary" onClick={()=>counterStore.increment(5)}>increment5</Button>
    </ButtonGroup>
    </Box>
    <Box sx={{width:'40%',p:4}}>
    <Typography variant="h5">Counter events({counterStore.eventCount})</Typography>
    <List>
      {counterStore.events.map((event,index)=>(
        <ListItem key={index}>{event}</ListItem>
      ))}
    </List>
    </Box>
    </Box>
  )
});
export default Counter;
 