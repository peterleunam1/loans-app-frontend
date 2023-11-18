import Typography, { TypographyOwnProps } from "@mui/material/Typography";
import { Line } from "./title.styled";
import Box from "@mui/material/Box";

// Interfaces
interface TitleProps extends TypographyOwnProps {
  children: React.ReactNode;
}

export default function Title({
  children,
  variant = "h2",
  ...props
}: TitleProps) {
  return (
    <Box>
      <Line></Line>
      <Typography sx={{ fontWeight: "500" }} variant={variant} {...props}>
        {children}
      </Typography>
    </Box>
  );
}
