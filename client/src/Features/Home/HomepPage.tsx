import { Group } from "@mui/icons-material"
import { Box, Button, Paper, Typography } from "@mui/material"
import { Link } from "react-router"

const HomepPage = () => {
  return (
  <Paper square sx={{
    color: 'white',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    alignContent: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a78c 89%)',
    px: 2,
  }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      color: 'white',
      gap: { xs: 1.5, sm: 3 },
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      <Group sx={{ height: { xs: 60, sm: 110 }, width: { xs: 60, sm: 110 } }} />
      <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '6rem' } }}>
        SyncUp
      </Typography>
    </Box>

    <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.75rem' }, textAlign: 'center' }}>
      Welcome To SyncUp
    </Typography>

    <Button
      component={Link}
      to='/activities'
      size='large'
      variant="contained"
      sx={{
        height: { xs: 56, sm: 80 },
        fontSize: { xs: '1rem', sm: '1.5rem' },
        borderRadius: 4,
        px: { xs: 3, sm: 5 },
      }}
    >
      Take me to the Activities!
    </Button>
  </Paper>
);
}

export default HomepPage