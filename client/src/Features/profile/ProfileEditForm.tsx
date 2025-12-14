import { useParams } from "react-router";
import { useProfile } from "../../lib/Hooks/useProfile";
import { useForm } from "react-hook-form";
import { editProfileSchema } from "../../lib/Schema/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import TextInput from "../../App/Shared/Components/TextInput";
import { useEffect } from "react";

type Props = {
  setEditMode: (editMode: boolean) => void;
};
function ProfileEditForm({ setEditMode }: Props) {
  const { id } = useParams();
  const { editProfile, profile } = useProfile(id);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<editProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });
  const onSubmit = (data: editProfileSchema) => {
    editProfile.mutate(data, {
      onSuccess: () => setEditMode(false),
    });
  };
  useEffect(() => {
    reset({
      displayName: profile?.displayName,
      bio: profile?.bio || "",
    });
  }, [profile, reset]);
  return (
    <>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        mt={3}
        alignContent='center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Display Name" name="displayName" control={control} />
        <TextInput
          label="Add your Bio"
          name="bio"
          control={control}
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || !isValid || editProfile.isPending}
        >
          Update Profile
        </Button>
      </Box>
    </>
  );
}

export default ProfileEditForm;
