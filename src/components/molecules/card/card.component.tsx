// Interfaces

import { Box, BoxProps, Button, Typography } from "@mui/material";

interface BasicCardProps extends BoxProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export default function BasicCard({
  title,
  description,
  image,
  buttonText,
  ...props
}: BasicCardProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box>
        <img src={image} alt="Card descriptive" />
        <Typography sx={{ fontWeight: "700" }} variant="h6">
          {title}
        </Typography>
        <Typography marginTop="1rem" variant="body1">
          {description}
        </Typography>
      </Box>
      <Button>{buttonText}</Button>
    </Box>
  );
}
