import { keyframes } from "@mui/system";

const moveForward = keyframes`
  from {
    margin-left: 0;
  }
  to {
    margin-left: 0.5rem;
    transform: rotate(360deg)
  }
`;

const moveBackward = keyframes`
  from {
    margin-left: 0.5rem;
    transform: rotate(0deg)
  }
  to {
    margin-left: 0;
    transform: rotate(180deg)
  }
`;

export const buttonStyles = {
  borderRadius: "24px",
  textTransform: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    ".iconBox": {
      animation: `${moveForward} 0.3s forwards ease-in-out`,
    },
  },
  ".iconBox": {
    transform: "rotate(180deg)",
    animation: `${moveBackward} 0.3s forwards ease-in-out`,
  },
};
