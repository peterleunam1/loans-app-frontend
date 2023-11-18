import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { regexs } from "./regexs.constant";

export const loanFields = [
  {
    name: "initialAmount",
    label: "monto de dinero a prestar",
    regex: regexs.NUMBERS,
    icon: <AttachMoneyOutlinedIcon />,
  },
  {
    name: "interest",
    label: "interest",
    regex: regexs.NUMBERS,
    icon: <TrendingUpOutlinedIcon />,
  },
  {
    name: "n_fees",
    label: "número de cuotas",
    regex: regexs.NUMBERS,
    icon: <FormatListNumberedOutlinedIcon />,
  },
  {
    name: "reason",
    label: "razón",
    regex: regexs.TEXT,
    icon: <TextFieldsOutlinedIcon />,
  },
];
export const creditFields = [
  {
    name: "year",
    label: "año de vencimiento",
    regex: regexs.TWO_NUMBERS,
    icon: <DateRangeOutlinedIcon />,
  },
  {
    name: "month",
    label: "mes de vencimiento",
    regex: regexs.TWO_NUMBERS,
    icon: <DateRangeOutlinedIcon />,
  },
  {
    name: "card_number",
    label: "número de tarjeta",
    regex: regexs.CREDIT_CARD,
    icon: <CreditCardOutlinedIcon />,
  },
  {
    name: "security_code",
    label: "código de seguridad",
    regex: regexs.FOUR_NUMBERS,
    icon: <VpnKeyOutlinedIcon />,
  },
];

export const frecuencesData = ["Quincenal", "Mensual"];
