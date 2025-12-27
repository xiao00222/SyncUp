import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import useActivities from "../../../lib/Hooks/useActivities";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const ActivityList = observer( function ActivityList() {
  const { activitiesgrp, isLoading, hasNextPage, fetchNextPage } =
    useActivities();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (isLoading) return <Typography>Loading...</Typography>;
  if (!activitiesgrp) return <Typography>No activities</Typography>;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activitiesgrp.pages.map((activities, index) => (
        <Box
          key={index}
          ref={index === activitiesgrp.pages.length - 1 ? ref : null}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          {activities.items.map((activity) => (
            //if need to return more thn one then we use {}
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </Box>
      ))}
    </Box>
  );
});

export default ActivityList;
