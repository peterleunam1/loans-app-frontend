import { useState } from 'react'
import { TextField, Typography, Box } from '@mui/material'
import { boxStyles, textFieldStyles } from './input.syled'
import { getCapitalize } from 'utils'

interface InputProps {
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  regex: RegExp
  icon: JSX.Element
  name: string
  type?: string
}

export default function Input ({ regex, label, icon, type = 'text', name, onChange }: InputProps) {
  const [error, setError] = useState<boolean>(false)

  const labelCapitalized = getCapitalize(label)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value)) {
      onChange(e)
      setError(false)
    } else setError(true)
  }

  return (
    <Box
      sx={boxStyles}
    >
      {icon}
      <Box sx={{ width: '100%' }}>
        <TextField
          id="filled-password-input"
          label={labelCapitalized}
          type="text"
          autoComplete="current-password"
          variant="filled"
          sx={textFieldStyles}
          error={error}
          size="small"
          typeof={type}
          name={name}
          onChange={handleChange}
        />
        {error && (
          <Typography variant="caption" component="small" sx={{
            color: 'red'
          }}>
            Ingrese un carácter válido
          </Typography>
        )}
      </Box>
    </Box>
  )
}
