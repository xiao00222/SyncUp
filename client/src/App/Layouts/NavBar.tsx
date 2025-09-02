import { Group } from "@mui/icons-material"
import  { Box, AppBar, Toolbar,  Container, MenuItem, Typography, LinearProgress } from "@mui/material"
import { NavLink } from "react-router"
import MenuItemLink from "../Shared/Components/MenuItemLink"
import useStore from "../../lib/Hooks/useStore"
import { Observer } from "mobx-react-lite"
export const NavBar = () => {
  const {uiStore}=useStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='absolute' sx={{backgroundImage:
        'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a78c 89%)',
        position:'relative'}}>
          <Container maxWidth='xl'>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          <Box>
            <MenuItem component={NavLink} to='/' sx={{display:'flex',gap:2}}>
            <Group fontSize="large"/>
            <Typography variant="h4" fontWeight='bold' >SyncUp</Typography>
            </MenuItem>
          </Box>
          <Box sx={{display:"flex"}}>
            <MenuItemLink  to='/activities' >
            Activities
            </MenuItemLink>
            <MenuItemLink to='/createActivity' >
            Create Activity
            </MenuItemLink>
            <MenuItemLink to='/counter' >
            Counter
            </MenuItemLink>
            <MenuItemLink to='/errors' >
            Errors
            </MenuItemLink>
          </Box>
          <MenuItem>
          Use Menu
          </MenuItem>
        </Toolbar>
          </Container>
          <Observer>
            {()=>uiStore.isloading?(
              <LinearProgress
                color="secondary"
                sx={{
                  position:"absolute",
                  bottom:0,
                  left:0,
                  right:0,
                  height:4
                }}
              />
            ) :null}
          </Observer>
      </AppBar>
    </Box>
  )
}
