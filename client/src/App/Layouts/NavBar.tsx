import { Group } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../Shared/Components/MenuItemLink";
import useStore from "../../lib/Hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/Hooks/useAccount";
import UserMenu from "./UserMenu";
export const NavBar = () => {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a78c 89%)",
          position: "fixed",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography position='relative' variant="h4" fontWeight="bold">
                  SyncUp
                </Typography>
                <Observer>
                  {() =>
                    uiStore.isloading ? (
                      <CircularProgress
                      size={20}
                      thickness={7}
                        sx={{
                          color:'white',
                          position:'absolute',
                          top:'30%',
                          left:'105%'
                        }}
                      />
                    ) : null
                  }
                </Observer>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/counter">Counter</MenuItemLink>
              <MenuItemLink to="/errors">Errors</MenuItemLink>
            </Box>
            <Box display="flex" alignItems="center">
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <MenuItemLink to="/login">Login</MenuItemLink>
                  <MenuItemLink to="/register">Register</MenuItemLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
