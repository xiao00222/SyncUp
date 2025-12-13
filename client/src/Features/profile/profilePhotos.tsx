import { useParams } from "react-router";
import { useProfile } from "../../lib/Hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import PhotoUploadWidget from "../../App/Shared/Components/PhotoUploadWidget";
import StarButton from "../../App/Shared/Components/StarButton";
import DeleteButton from "../../App/Shared/Components/DeleteButton";

export default function ProfilePhotos() {
  const { id } = useParams();
  const {
    photos,
    isLoadingPhotos,
    isCurrentUser,
    uploadPhoto,
    profile,
    setMainPhoto,
    deletePhoto,
  } = useProfile(id);
  const [editMode, setEditMode] = useState(false);
  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => setEditMode(false),
    });
  };
  if (isLoadingPhotos) return <Typography>Loading Photos...</Typography>;
  if (!photos) return <Typography>No Photos found</Typography>;
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Photos</Typography>
        {isCurrentUser && (
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Add Photos"}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />

      {editMode ? (
        <PhotoUploadWidget
          uploadPhoto={handlePhotoUpload}
          loading={uploadPhoto.isPending}
        />
      ) : (
        <>
          {photos.length == 0 ? (
            <Typography>No Photos Added yet</Typography>
          ) : (
            <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
              {photos.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    srcSet={`${item.url.replace(
                      "/upload",
                      "/upload/w_164,h_164,c_fill,f_auto,dpr_2/"
                    )}`}
                    src={`${item.url.replace(
                      "/upload",
                      "/upload/w_164,h_164,c_fill,f_auto/"
                    )}`}
                    alt={"user profile image"}
                    loading="lazy"
                  />
                  {isCurrentUser && (
                    <div>
                      <Box
                        sx={{ position: "absolute", top: 0, left: 0 }}
                        onClick={() => setMainPhoto.mutate(item)}
                      >
                        <StarButton selected={item.url === profile?.imageUrl} />
                      </Box>
                      {profile?.imageUrl !== item.url && (
                        <Box
                          sx={{ position: "absolute", top: 0, right: 0 }}
                          onClick={() => deletePhoto.mutate(item.id)}
                        >
                          <DeleteButton />
                        </Box>
                      )}
                    </div>
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </>
      )}
    </Box>
  );
}
