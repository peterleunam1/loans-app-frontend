import { Box, type SelectChangeEvent, Typography } from '@mui/material'
import { Button, CustomSelect, Input } from 'components/atoms'
import { boxButtonStyles } from './add-loan.styled'
import { regexs } from 'constant'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import { useState } from 'react'
import { type AppStore, type LoansModel } from 'models'
import { useDispatch, useSelector } from 'react-redux'
import { addUserLoan } from '../../../redux/states/user'
import { updateUser } from '../../../redux/states/users'
import { getSingleId } from 'utils'

const data = [
  {
    name: 'initialAmount',
    label: 'monto de dinero a prestar',
    regex: regexs.NUMBERS,
    icon: <AttachMoneyOutlinedIcon />
  },
  {
    name: 'interest',
    label: 'interest',
    regex: regexs.NUMBERS,
    icon: <TrendingUpOutlinedIcon />
  },
  {
    name: 'n_fees',
    label: 'número de cuotas',
    regex: regexs.NUMBERS,
    icon: <FormatListNumberedOutlinedIcon />
  },
  {
    name: 'reason',
    label: 'razón',
    regex: regexs.TEXT,
    icon: <TextFieldsOutlinedIcon />
  }
]
export interface ValuesLoansInputReturned {
  deudor: string
  interest: string
  initialAmount: string
  n_fees: number
  frequence: string
  reason: string
}
interface AddLoanProps {
  setOpen: (value: boolean) => void
  setAlert: (value: boolean) => void
}

export default function AddLoan ({ setOpen, setAlert }: AddLoanProps) {
  const userLoans = useSelector((store: AppStore) => store.user_active)

  const dispatch = useDispatch()

  const [values, setValues] = useState<ValuesLoansInputReturned>({
    deudor: '',
    interest: '',
    initialAmount: '',
    n_fees: 0,
    frequence: '',
    reason: ''
  })

  const [existLoanBefore, setExistLoanBefore] = useState<boolean>(false)

  const handleClose = () => { setOpen(false) }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
    if (userLoans.loans.length > 0) {
      const exist = userLoans.loans.find((item) => item.document === e.target.value)
      if (exist) setExistLoanBefore(true)
      else setExistLoanBefore(false)
    }
  }

  const handleSubmit = () => {
    const debtor = userLoans.debts.find((item) => item.document === values?.deudor)
    const id = getSingleId()
    if (debtor && values.initialAmount && values.interest) {
      const newLoan: LoansModel = {
        id,
        fullName: debtor?.fullName ?? '',
        document: debtor?.document ?? '',
        initialAmount: Number(values?.initialAmount),
        abonos: 0,
        date: new Date(),
        interest: Number(values?.interest),
        n_fees: Number(values?.n_fees),
        frequence: values?.frequence,
        reason: values?.reason,
        paid_fees: 0
      }
      if (newLoan) {
        dispatch(addUserLoan(newLoan))
        dispatch(updateUser({
          ...userLoans,
          loans: [...userLoans.loans, newLoan]
        }))
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 3000)
        handleClose()
      }
    }
  }

  return (
    <Box sx={{ width: '85%' }}>
      {existLoanBefore && (<Typography variant="subtitle2" component="p" sx={{
        color: 'blue',
        mb: 2
      }}>Este usuario ya tiene un prestamo activo</Typography>)}
      <form onSubmit={handleSubmit}>
        <CustomSelect
          data={userLoans.debts}
          label="deudor"
          name="deudor"
          icon={<PersonRemoveOutlinedIcon />}
          onChange={handleChangeSelect}
        />
        {userLoans.debts.length === 0 && (
          <Typography variant="subtitle1" component="p" sx={{
            color: 'blue',
            mb: 2
          }}>No tienes deudores registrados</Typography>
        )
          }
        {data.map((item, index) => (
          <Input
            key={index}
            label={item.label}
            regex={item.regex}
            onChange={handleChangeInput}
            icon={item.icon}
            name={item.name}
          />
        ))}
        <CustomSelect data={['mensual', 'quincenal']} label="tipo de prestamo" name="frequence" icon={<PersonRemoveOutlinedIcon />} onChange={handleChangeSelect}/>
        <Box sx={boxButtonStyles}>
          <Button loading={false} text='registrar' onClick={handleSubmit} withIcon/>
          <Typography variant="subtitle2" component="p">Mantén tus negocios al dia con loansApp</Typography>
        </Box>
      </form>
    </Box>
  )
}
