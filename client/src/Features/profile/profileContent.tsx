import { Box, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import ProfilePhotos from "./profilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";

export default function ProfileContent() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tabContent = [
    { label: "About", content: <ProfileAbout /> },
    { label: "Photos", content: <ProfilePhotos /> },
    { label: "Events", content: <ProfileActivities /> },
    { label: "Followers", content: <ProfileFollowings activeTab={value} /> },
    { label: "Following", content: <ProfileFollowings activeTab={value} /> },
  ];

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      component={Paper}
      mt={2}
      p={{ xs: 1.5, sm: 3 }}
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        borderRadius: 3,
        minHeight: 500,
      }}
    >
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: isMobile ? 0 : 1,
          borderBottom: isMobile ? 1 : 0,
          borderColor: "divider",
          minWidth: isMobile ? "100%" : 200,
          width: isMobile ? "100%" : "auto",
        }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{ mr: isMobile ? 0 : 3 }} />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: { xs: 1.5, sm: 3 }, width: "100%" }}>
        {tabContent[value].content}
      </Box>
    </Box>
  );
}