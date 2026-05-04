import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export const ActivityDashboard = () => {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <ActivityList />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 5 }}
          sx={{ position: { md: "sticky" }, top: 112, alignSelf: "flex-start" }}
        >
          <ActivityFilters />
        </Grid2>
      </Grid2>
    </>
  );
};