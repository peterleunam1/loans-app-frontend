import { Box, styled } from "@mui/material";
import { keyframes } from "@mui/system";
import ClickImage from "assets/images/click.png";

export const moveForward = keyframes`
    from {
        margin-left: 0;
    }
    to {
        margin-left: 20px;
    }
`;

export const JumbotronComponent = {
  display: "flex",
  gap: "2rem",
  margin: {
    xs: "2rem auto",
    md: "1rem auto",
  },
};

export const TextContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "flex-start",
};

export const ImageExpression = styled(Box)(({ theme }) => ({
  position: "absolute",
  fontFamily: theme.typography.fontFamily,
  bottom: "50px",
  left: "-50px",
  width: "80px",
  padding: "1rem",
  borderRadius: "10px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&::after": {
    content: `url(${ClickImage})`,
    transform: "scale(0.5)",
    position: "absolute",
  },
}));
