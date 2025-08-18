import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
export const ActivityDashboard = () => {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={7} maxWidth="xl">
          <ActivityList />
        </Grid2>
        <Grid2 size={5}>
          Activity Filters go here
        </Grid2>
      </Grid2>
    </>
  );
};
