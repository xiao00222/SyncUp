import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type UseControllerProps, type FieldValues } from "react-hook-form";

type Props<T extends FieldValues> ={}& UseControllerProps<T> & TextFieldProps;

//making props generic to work with anytype
const TextInput = <T extends FieldValues>(props: Props<T>) => {
  const { field, fieldState } = useController(props);

  return (
    <TextField
      {...props}          //  extra TextField props (like label, type, etc.)
      {...field}          // RHF bindings (value, onChange, ref...)
      value={field.value||''}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};

export default TextInput;
