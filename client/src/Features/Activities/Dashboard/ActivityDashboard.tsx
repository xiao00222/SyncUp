import {  Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
export const ActivityDashboard = () => {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={7} maxWidth="xl">
          <ActivityList />
        </Grid2>
        <Grid2 size={5}
        sx={{position:'sticky',top:112,alignSelf:'flex-start'}}
        >
          <ActivityFilters />
        </Grid2>
      </Grid2>
    </>
  );
};
