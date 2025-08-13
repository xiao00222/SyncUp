import { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { NavBar } from "./NavBar";
import { ActivityDashboard } from "../../Features/Activities/Dashboard/ActivityDashboard";

import useActivities from "../../lib/Hooks/useActivities";
function App() {
  const [selectedactivity, setselectedactivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const{activities, isLoading}=useActivities();
  const handleSelectActivity = (id: string) => {
    setselectedactivity(activities!.find((x) => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setselectedactivity(undefined);
  };
  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };
  const handleFormClose = () => {
    setEditMode(false);
  };
  
  
  return (
    <Box sx={{ bgcolor: "grey.300" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container sx={{ mt: 8 }}>
        {!activities || isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedactivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
