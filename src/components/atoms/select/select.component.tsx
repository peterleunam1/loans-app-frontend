import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { type AddLoanDebts } from 'models'
import { getCapitalize } from 'utils'
import { selectStyles } from './select.styled'

interface SelectStyledProps {
  label: string
  data: AddLoanDebts[]
  icon: JSX.Element
  onChange: () => void
}
export default function SelectStyled ({ label, data, onChange, icon }: SelectStyledProps) {
  const labelCapitalized = getCapitalize(label)
  const handleChange = () => {
    onChange()
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
          sx={{
            ml: 1
          }}
        >
          {data.map((item, index) => (
            <MenuItem key={index} value={item.fullName}>
              {item.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
