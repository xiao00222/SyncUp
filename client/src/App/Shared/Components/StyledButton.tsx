import { Button, styled, type ButtonProps } from "@mui/material";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.text.disabled
  }
}));

export default StyledButton;
