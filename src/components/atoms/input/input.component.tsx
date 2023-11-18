import { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { boxStyles, textFieldStyles } from "./input.syled";
import { getCapitalize } from "utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface InputProps {
  label: string;
  onChange: (e: any) => void;
  regex: RegExp;
  icon: JSX.Element;
  name: string;
  type?: string;
}

export default function Input({
  regex,
  label,
  icon,
  type = "text",
  name,
  onChange,
}: InputProps) {
  const [error, setError] = useState<boolean>(false);

  const labelCapitalized = getCapitalize(label);

  const handleChange = (e: any) => {
    if (type === "date") {
      console.log(typeof new Date(e.$d));
      onChange(new Date(e.$d));
    } else {
      if (regex.test(e.target.value)) {
        onChange(e);
        setError(false);
      } else setError(true);
    }
  };

  return (
    <Box sx={boxStyles}>
      {icon}
      <Box sx={{ width: "100%" }}>
        {type === "date" ? (
          <DatePicker
            label={label}
            onAccept={(value) => handleChange(value)}
            closeOnSelect
            disableFuture
            disableHighlightToday
          />
        ) : (
          <TextField
            id={name}
            label={labelCapitalized}
            type={type}
            autoComplete="current-password"
            variant="filled"
            sx={textFieldStyles}
            error={error}
            size="small"
            typeof={type}
            name={name}
            onChange={handleChange}
          />
        )}
        {error && (
          <Typography
            variant="caption"
            component="small"
            sx={{
              color: "red",
            }}
          >
            Ingrese un carácter válido
          </Typography>
        )}
      </Box>
    </Box>
  );
}
