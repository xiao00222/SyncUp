import { FormControl, FormHelperText, InputLabel, MenuItem, Select, } from "@mui/material";
import type { SelectInputProps } from "@mui/material/Select/SelectInput";
import { useController, type UseControllerProps, type FieldValues } from "react-hook-form";

type Props<T extends FieldValues> ={
items:{text:string,value:string}[];
label:string //input label
} & UseControllerProps<T> &Partial<SelectInputProps>;

//making props generic to work with anytype
const SelectInput = <T extends FieldValues>(props: Props<T>) => {
  const { field, fieldState } = useController({...props});

  return (
   <FormControl fullWidth error={!!fieldState.error}>
<InputLabel>{props.label}</InputLabel>
<Select value={field.value||''}
label={props.label}
onChange={field.onChange}


>
    {props.items.map(item=>(
        <MenuItem key={item.value} value={item.value}>
        {item.text}
        </MenuItem>
    ))}
</Select>
<FormHelperText>{fieldState.error?.message}</FormHelperText>
   </FormControl>
  );
};

export default SelectInput;
