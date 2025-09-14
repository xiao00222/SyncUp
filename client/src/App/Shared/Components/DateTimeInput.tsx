import { useController, type UseControllerProps, type FieldValues } from "react-hook-form";
import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers";

type Props<T extends FieldValues> = UseControllerProps<T> & DateTimePickerProps;

const DateTimeInput = <T extends FieldValues>(props: Props<T>) => {
  const { field, fieldState } = useController(props);

  return (
    <DateTimePicker
      {...props}
      value={field.value ? new Date(field.value) : null}
      onChange={(value) => {
        field.onChange(value ? new Date(value) : null);
      }}
      sx={{ width: "100%" }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        },
      }}
    />
  );
};

export default DateTimeInput;
