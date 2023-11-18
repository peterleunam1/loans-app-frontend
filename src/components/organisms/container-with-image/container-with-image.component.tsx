import { Box, Container } from "@mui/material";
import { Title } from "components/index";
import {
  ContainerWithImageStyles,
  TextContainer,
} from "./container-with-image.styled";

interface ContainerWithImageProps {
  children: React.ReactNode;
  image: string;
  title: string;
  imagePosition?: "left" | "right";
}

export default function ContainerWithImage({
  children,
  image,
  title,
  imagePosition,
}: ContainerWithImageProps) {
  return (
    <Container
      sx={{
        ...ContainerWithImageStyles,
        flexDirection: imagePosition === "left" ? "row-reverse" : "row",
      }}
    >
      <Box sx={TextContainer}>
        <Title variant="h3">{title}</Title>
        <Box>{children}</Box>
      </Box>
      <Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, position: "relative" }}>
          <img src={image} alt="Cash with Calculator" />
        </Box>
      </Box>
    </Container>
  );
}
