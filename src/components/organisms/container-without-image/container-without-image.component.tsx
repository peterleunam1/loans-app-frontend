import { Container } from "@mui/material";
import { Title } from "components/atoms";
import { ContainerWithoutImageStyles } from "./container-without-image.styled";

// Interfaces
interface ContainerWithoutImageProps {
  title: string;
  children: React.ReactNode;
}

export default function ContainerWithoutImage({
  title,
  children,
}: ContainerWithoutImageProps) {
  return (
    <Container maxWidth="lg" sx={ContainerWithoutImageStyles}>
      <Title variant="h3">{title}</Title>
      {children}
    </Container>
  );
}
