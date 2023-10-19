import { TextField, Typography, Box } from '@mui/material'
import { useState } from 'react'
import { textFieldStyles } from './input.syled'
import { getCapitalize } from 'utils'

interface InputProps {
  label: string
  onChange: (value: string) => void
  regex: RegExp
  icon: JSX.Element
}

export default function Input ({ regex, label, icon, onChange }: InputProps) {
  const [error, setError] = useState<boolean>(false)
  const labelCapitalized = getCapitalize(label)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (regex.test(e.target.value)) {
      onChange(value)
      setError(false)
    } else setError(true)
  }

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
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
          name={label}
          onChange={handleChange}
        />
        {error && (
          <Typography variant="caption" component="small">
            Ingrese un carácter válido
          </Typography>
        )}
      </Box>
    </Box>
  )
}
