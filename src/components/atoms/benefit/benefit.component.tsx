import { Box, BoxProps, Typography } from "@mui/material";

// Interfaces

interface BenefitProps extends BoxProps {
  title: string;
  icon: React.ReactNode;
}

export default function Benefit({ title, icon, ...props }: BenefitProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          padding: "1.5rem",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
        }}
      >
        {icon}
      </Box>
      <Typography textAlign="center" variant="body1">
        {title}
      </Typography>
    </Box>
  );
}
