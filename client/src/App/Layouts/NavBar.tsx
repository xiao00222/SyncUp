import { Group, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  MenuItem,
  Typography,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../Shared/Components/MenuItemLink";
import useStore from "../../lib/Hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/Hooks/useAccount";
import UserMenu from "./UserMenu";
import { useState } from "react";

export const NavBar = () => {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a78c 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

            {/* Logo */}
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography position="relative" variant="h5" fontWeight="bold">
                  SyncUp
                </Typography>
                <Observer>
                  {() =>
                    uiStore.isloading ? (
                      <CircularProgress
                        size={20}
                        thickness={7}
                        sx={{
                          color: "white",
                          position: "absolute",
                          top: "30%",
                          left: "105%",
                        }}
                      />
                    ) : null
                  }
                </Observer>
              </MenuItem>
            </Box>

            {/* Desktop nav links — hidden on mobile */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
            </Box>

            {/* Desktop user menu — hidden on mobile */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <MenuItemLink to="/login">Login</MenuItemLink>
                  <MenuItemLink to="/register">Register</MenuItemLink>
                </>
              )}
            </Box>

            {/* Hamburger — only on mobile */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 220, pt: 4 }} onClick={() => setDrawerOpen(false)}>
          <ListItem disablePadding>
            <MenuItemLink to="/activities">Activities</MenuItemLink>
          </ListItem>
          {currentUser ? (
            <ListItem disablePadding>
              <UserMenu />
            </ListItem>
          ) : (
            <>
              <ListItem disablePadding>
                <MenuItemLink to="/login">Login</MenuItemLink>
              </ListItem>
              <ListItem disablePadding>
                <MenuItemLink to="/register">Register</MenuItemLink>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};