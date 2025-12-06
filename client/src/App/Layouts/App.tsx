import { Box, Container, CssBaseline } from "@mui/material";
import { NavBar } from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomepPage from "../../Features/Home/HomepPage";

function App() {
  const location = useLocation();
  return (
    <Box sx={{ bgcolor: "grey.300" }}>
      <ScrollRestoration/>
      <CssBaseline />
      {
        (location.pathname === "/" ? (
          <HomepPage />
        ) : (
          <>
            <NavBar />
            <Container sx={{ mt: 8 }}>
              <Outlet />
            </Container>
          </>
        ))
      }
    </Box>
  );
}

export default App;
