import { Delete, DeleteOutline } from "@mui/icons-material";
import { Box } from "@mui/material";

function StarButton() {
  return (
    <Box
      sx={{
        opacity: 0.8,
        transition: "opacity 0.3s",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <DeleteOutline
        sx={{
          fontSize: 28,
          color: "white",
          position: "absolute",
        }}
      />
      <Delete
      sx={{
        fontSize:28,
        color:"red",

      }}
      />
    </Box>
  );
}

export default StarButton;
