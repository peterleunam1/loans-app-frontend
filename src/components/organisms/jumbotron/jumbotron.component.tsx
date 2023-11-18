// Imports

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container, { ContainerProps } from "@mui/material/Container";
import { Button } from "components/atoms";
import { Title } from "components/atoms/title";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CashWithCalculator from "assets/images/cash-with-calculator.png";
import {
  ImageExpression,
  JumbotronComponent,
  TextContainer,
} from "./jumbotron.styled";

// Interfaces
interface JumbotronProps extends ContainerProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function Jumbotron({
  title,
  description,
  buttonText,
  ...props
}: JumbotronProps) {
  return (
    <Container
      {...props}
      sx={JumbotronComponent}
      component="section"
      maxWidth="lg"
    >
      <Box sx={TextContainer}>
        <Title>{title}</Title>
        <Typography variant="h5" marginBottom={"2rem"}>
          {description}
        </Typography>
        <Button
          loading={false}
          text={buttonText}
          icon={<ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />}
          onClick={() => console.log("a")}
        ></Button>
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" }, position: "relative" }}>
        <img src={CashWithCalculator} alt="Cash with Calculator" />
        <ImageExpression boxShadow={4}>
          Maneja tu <b>dinero</b> de forma fácil
        </ImageExpression>
      </Box>
    </Container>
  );
}
