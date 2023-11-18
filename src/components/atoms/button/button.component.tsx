import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { buttonStyles } from "./button.styled";
import { getCapitalize } from "utils";
import Box from "@mui/material/Box";

interface ButtonProps extends LoadingButtonProps {
  onClick: () => void;
  loading: boolean;
  withIcon?: boolean;
  text: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
}
export default function Button({
  isDisabled,
  loading,
  withIcon,
  text,
  onClick,
  icon,
  ...props
}: ButtonProps) {
  const textCapitalized = getCapitalize(text);

  const handleClick = () => {
    onClick();
  };

  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      sx={buttonStyles}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {textCapitalized}
      {withIcon && <AddIcon />}
      {icon && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="iconBox"
        >
          {icon}
        </Box>
      )}
    </LoadingButton>
  );
}
