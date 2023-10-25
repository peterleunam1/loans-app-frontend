import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from '@mui/material'
import { type AddLoanDebts } from 'models'
import { getCapitalize } from 'utils'
import { selectStyles } from './select.styled'

interface SelectStyledProps {
  label: string
  data: AddLoanDebts[] | string[]
  icon: JSX.Element
  name: string
  onChange: (e: SelectChangeEvent<string>) => void
}
export default function SelectStyled ({
  label,
  data,
  onChange,
  icon,
  name
}: SelectStyledProps) {
  const labelCapitalized = getCapitalize(label)
  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange(e)
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
      <FormControl variant="filled" sx={selectStyles}>
        <InputLabel id="demo-simple-select-filled-label">
          {labelCapitalized}
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleChange}
          name={name}
          sx={{
            ml: 1
          }}
        >
          {data.map((item, index) => {
            if (typeof item === 'object') {
              return (
                <MenuItem key={index} value={item.document}>
                  {item.fullName}
                </MenuItem>
              )
            }
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
