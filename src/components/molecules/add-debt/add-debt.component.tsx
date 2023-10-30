import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { type AppStore, type DebtsModel } from 'models'
import { getSingleId } from 'utils'
import { debtsFields, initialStates } from 'constant'
import { Button, Input } from 'components/atoms'
import { boxButtonStyles } from '../add-loan/add-loan.styled'
import { addUserDebt } from '../../../redux/states/user'

interface AddDebtProps {
  setOpen: (value: boolean) => void
  setAlert: (value: boolean) => void
}

export default function AddDebt ({ setOpen, setAlert }: AddDebtProps) {
  const dispatch = useDispatch()

  const userDebts = useSelector((store: AppStore) => store.user_active.debts)

  const [existDebtorBefore, setExistDebtorBefore] = useState<boolean>(false)

  const [debtor, setDebtor] = useState<DebtsModel>(initialStates.debts)

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = getSingleId()
    setDebtor({
      ...debtor,
      id,
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'document') {
      if (userDebts.length > 0) {
        const exist = userDebts.find(
          (item) => item.document === e.target.value
        )
        if (exist) setExistDebtorBefore(true)
        else setExistDebtorBefore(false)
      }
    }
  }

  const handleSubmit = () => {
    if (debtor && !existDebtorBefore) {
      dispatch(addUserDebt(debtor))
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
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'red', mb: 2 }}
        >
          El documento ya se encuentra registrado, por favor verifica los datos
        </Typography>
      )}
      <form>
        {debtsFields.map((item, index) => (
          <Input key={index} onChange={handleChange} {...item} />
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
