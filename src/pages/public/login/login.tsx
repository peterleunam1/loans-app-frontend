import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/states/user";
import { createUser } from "../../../redux/states/users";
import {
  Benefits,
  MainMenuItems,
  MenuItems,
  privateRoutes,
  publicRoutes,
  regexs,
  successStories,
} from "constant";
import { useNavigation } from "hooks";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import {
  Alert,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Button, Input, Modal } from "components/atoms";
import { type AppStore, type UserModel } from "models";
import { useState } from "react";
import AppBarMenu from "components/molecules/app-bar-menu";
import Jumbotron from "components/organisms/jumbotron";
import ContainerWithImage from "components/organisms/container-with-image";
import CashWithHand from "assets/images/cash-with-hand.png";
import StarIcon from "@mui/icons-material/Star";
import ContainerWithoutImage from "components/organisms/container-without-image";
import BasicCard from "components/molecules/card/card.component";
import Benefit from "components/atoms/benefit";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { getCapitalize } from "utils";
import DatePicker from "@mui/lab/DesktopDatePicker";

const datarRegister = [
  {
    name: "name",
    label: "nombres",
    regex: regexs.TEXT,
    icon: <PersonIcon />,
    type: "text",
  },
  {
    name: "lastName",
    label: "apellidos",
    regex: regexs.TEXT,
    icon: <PersonIcon />,
    type: "text",
  },
  {
    name: "email",
    label: "correo electrónico",
    regex: regexs.EMAIL,
    icon: <AlternateEmailIcon />,
    type: "email",
  },
  {
    name: "password",
    label: "contraseña",
    regex: regexs.PASSWORD,
    icon: <PasswordIcon />,
    type: "password",
  },
  {
    name: "document",
    label: "documento de indentidad",
    regex: regexs.NUMBERS,
    icon: <BrandingWatermarkIcon />,
    type: "number",
  },
  {
    name: "department",
    label: "departamento",
    regex: regexs.TEXT,
    icon: <LocationOnIcon />,
    type: "text",
  },
  {
    name: "city",
    label: "ciudad",
    regex: regexs.TEXT,
    icon: <LocationOnIcon />,
    type: "text",
  },
  {
    name: "born",
    label: "fecha de nacimiento",
    regex: regexs.TEXT,
    icon: <DateRangeIcon />,
    type: "date",
  },
];
const datarLogin = [
  {
    name: "email",
    label: "correo electrónico",
    regex: regexs.EMAIL,
    icon: <AlternateEmailIcon />,
    type: "email",
  },
  {
    name: "password",
    label: "contraseña",
    regex: regexs.PASSWORD,
    icon: <PasswordIcon />,
    type: "password",
  },
];
export const initialStateRegister = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  document: 0,
  department: "",
  city: "",
  born: "",
};
export const Characteristics = ["Intuitivo", "Seguro", "Confiable"];
interface LoginModel {
  email: string;
  password: string;
}
export default function Login() {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();
  const [register, setRegister] = useState<UserModel>(initialStateRegister);
  const [login, setLogin] = useState<LoginModel>({ email: "", password: "" });
  const users = useSelector((store: AppStore) => store.users);
  const [alert, setAlert] = useState<string>("");
  const [modalToOpen, setModalToOpen] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if (!!e.target?.name === false) {
      setRegister({
        ...register,
        born: e.toISOString().split("T")[0],
      });
    } else {
      setRegister({
        ...register,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginU = () => {
    const user = users.find(
      (user) => user.email === login.email && user.password === login.password
    );
    if (user) {
      dispatch(setUser(user));
      setAlert("Bienvenido");
      goTo(`/${privateRoutes.PRIVATE}`);
    } else {
      setAlert("Usuario o contraseña incorrecto");
    }
  };

  const handleRegister = () => {
    if (users.find((user) => user.email === register.email)) {
      setAlert("El correo ya existe");
    } else if (users.find((user) => user.document === register.document)) {
      setAlert("El documento ya existe");
    } else {
      dispatch(
        createUser({
          ...register,
          loans: [],
          debts: [],
        })
      );
      setAlert("Usuario creado con éxito, inicie sesión");
      setTimeout(() => {
        setModalToOpen(null);
        setAlert("");
      }, 2000);
    }
  };

  const handleOpenModal = (modal: string) => {
    if (modal === "pagar") goTo(`/${publicRoutes.PAY_INIT}`);
    else setModalToOpen(modal);
  };

  return (
    <Container maxWidth="xl">
      <AppBarMenu
        elements={MenuItems}
        mainElements={MainMenuItems.map((item) => ({
          ...item,
          onClick: () => handleOpenModal(item.title),
        }))}
      />
      <Jumbotron
        title="La app que tu empresa necesita."
        description="Adminsitración del inventario de su empresa y control de existencias."
        buttonText="Probar gratis"
      ></Jumbotron>
      <ContainerWithImage
        image={CashWithHand}
        title="Tecnología, sencillez e intuición: loansApp"
        imagePosition="left"
      >
        <Typography variant="h6">
          Todo lo que necesitas está al alcance de tu mano, todo en un solo
          lugar
        </Typography>
        <List dense={true}>
          {Characteristics.map((characteristic) => (
            <ListItem key={characteristic}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">{characteristic}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </ContainerWithImage>
      <ContainerWithoutImage title="Historias de éxito">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridAutoRows: "1fr",
            gap: "2rem",
          }}
        >
          {successStories.map((story) => (
            <BasicCard key={story.title} {...story}></BasicCard>
          ))}
        </Box>
      </ContainerWithoutImage>
      <ContainerWithoutImage title="Beneficios">
        <Box>
          <Typography variant="h6" marginBottom="2rem">
            Trabajamos de la mano con las mejores tecnologias para garantizar
            una transformación ganadora a nuestros usuarios.
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {Benefits.map((benefit) => (
              <Benefit key={benefit.title} {...benefit} />
            ))}
          </Box>
        </Box>
      </ContainerWithoutImage>
      <ContainerWithoutImage title="Contáctanos">
        <Typography variant="h6">Queremos conocerte mejor</Typography>
        <Input
          name="promotional_email"
          icon={<AlternateEmailIcon />}
          label="Digita tu correo electrónico aquí"
          regex={regexs.TEXT}
          type="text"
          onChange={() => {}}
        ></Input>
        <Typography>
          ¡Nos alegra mucho que quieras formar parte de loansApp! <br /> Una vez
          digites tu correo electrónico. te estaremos dando respuesta
        </Typography>
      </ContainerWithoutImage>
      <Modal
        open={!!modalToOpen}
        setOpen={() => setModalToOpen(null)}
        title={getCapitalize(modalToOpen || "")}
      >
        {modalToOpen === "ingresar" ? (
          <Box>
            {datarLogin.map((item, index) => (
              <Input key={index} {...item} onChange={handleChangeLogin} />
            ))}
            <Button
              onClick={handleLoginU}
              loading={false}
              text="Iniciar sesión"
            ></Button>
            {alert && (
              <Alert severity="info" sx={{ marginTop: "2rem" }}>
                {alert}
              </Alert>
            )}
          </Box>
        ) : (
          <Box sx={{ width: "50%", m: "0 auto", p: 5 }}>
            {datarRegister.map((item, index) => (
              <Input key={index} {...item} onChange={handleChange} />
            ))}
            <Button
              loading={false}
              text="registrarse"
              onClick={handleRegister}
            />
            {alert && (
              <Alert severity="info" sx={{ marginTop: "2rem" }}>
                {alert}
              </Alert>
            )}
          </Box>
        )}
      </Modal>
    </Container>
  );
}
