import { Box, Typography } from '@mui/material'
import { Button, CustomSelect, Input } from 'components/atoms'
import { boxButtonStyles } from './add-loan.styled'
import { regexs } from 'constant'
import { debtsNamesAndDocuemnt } from '../../../pages/private/loans/loans'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'

const data = [
  {
    label: 'monto de dinero a prestar',
    regex: regexs.NUMBERS,
    date: new Date(),
    icon: <AttachMoneyOutlinedIcon />
  },
  {
    label: 'interés',
    regex: regexs.NUMBERS,
    date: new Date(),
    icon: <TrendingUpOutlinedIcon />
  }
]

export default function AddLoan () {
  return (
    <Box sx={{ width: '85%' }}>
      <form>
        <CustomSelect
          data={debtsNamesAndDocuemnt}
          label="deudor"
          icon={<PersonRemoveOutlinedIcon />}
          onChange={() => {}}
        />
        {data.map((item, index) => (
          <Input
            key={index}
            label={item.label}
            regex={item.regex}
            onChange={() => {}}
            icon={item.icon}
          />
        ))}
        <Input label="Razón" regex={regexs.TEXT} onChange={() => {}} icon={<TextFieldsOutlinedIcon/>} />
        <Box sx={boxButtonStyles}>
          <Button loading={false} text='registar' onClick={() => {}} withIcon/>
          <Typography variant="subtitle2" component="p">Mantén tus negocios al dia con loansApp</Typography>
        </Box>
      </form>
    </Box>
  )
}
