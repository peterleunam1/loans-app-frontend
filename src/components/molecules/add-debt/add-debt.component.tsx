import { Box, Typography } from '@mui/material'
import { boxButtonStyles } from '../add-loan/add-loan.styled'
import { Button, Input } from 'components/atoms'
import { regexs } from 'constant'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined'
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined'
import { type AppStore, type DebtsModel } from 'models'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUserDebt } from '../../../redux/states/user'

const data = [
  {
    label: 'nombre completo',
    regex: regexs.TEXT,
    date: new Date(),
    icon: <AccountCircleOutlinedIcon />,
    name: 'fullName'
  },
  {
    label: 'Documento de identidad',
    regex: regexs.DOCUMENT,
    date: new Date(),
    icon: <DocumentScannerOutlinedIcon />,
    name: 'document'
  },
  {
    label: 'email',
    regex: regexs.EMAIL,
    date: new Date(),
    icon: <AttachEmailOutlinedIcon />,
    name: 'email'
  },
  {
    label: 'teléfono',
    regex: regexs.PHONE,
    date: new Date(),
    icon: <PermPhoneMsgOutlinedIcon />,
    name: 'phone'
  },
  {
    label: 'ciudad',
    regex: regexs.TEXT,
    date: new Date(),
    icon: <LocationCityOutlinedIcon />,
    name: 'city'
  }
]

interface AddDebtProps {
  setOpen: (value: boolean) => void
  setAlert: (value: boolean) => void
}

export default function AddDebt ({ setOpen, setAlert }: AddDebtProps) {
  const userDebts = useSelector((store: AppStore) => store.user_active.debts)
  const [existDebtorBefore, setExistDebtorBefore] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [values, setValues] = useState<DebtsModel>({
    id: 0,
    fullName: '',
    document: '',
    email: '',
    phone: 0,
    city: ''
  })
  const handleClose = () => { setOpen(false) }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = userDebts.length + 1
    setValues({
      ...values,
      id,
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'document') {
      if (userDebts.length > 0) {
        const exist = userDebts.find((item) => item.document === e.target.value)
        if (exist) setExistDebtorBefore(true)
        else setExistDebtorBefore(false)
      }
    }
  }

  const handleSubmit = () => {
    if (values && !existDebtorBefore) {
      dispatch(addUserDebt(values))
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2000)
      handleClose()
    }
  }

  return (
    <Box sx={{ width: '85%' }}>
      {existDebtorBefore && (
        <Typography variant="subtitle2" component="p" sx={{ color: 'red', mb: 2 }}>
          El documento ya se encuentra registrado, por favor verifica los datos
          </Typography>
      )}
      <form>
        {data.map((item, index) => (
          <Input
            key={index}
            label={item.label}
            regex={item.regex}
            onChange={handleChange}
            icon={item.icon}
            name={item.name}
          />
        ))}
        <Box sx={boxButtonStyles}>
          <Button
            loading={false}
            text="registrar deudor"
            onClick={handleSubmit}
            withIcon
          />
          <Typography variant="subtitle2" component="p">
            Mantén tus negocios al dia con loansApp
          </Typography>
        </Box>
      </form>
    </Box>
  )
}
