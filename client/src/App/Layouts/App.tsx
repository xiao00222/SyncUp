import { Box, Container, CssBaseline } from "@mui/material";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router";

function App() {
  return (
    <Box sx={{ bgcolor: "grey.300" }}>
      <CssBaseline />
      <NavBar />
      <Container sx={{ mt: 8 }}>
        <Outlet/>
      </Container>
    </Box>
  );
}

export default App;
  