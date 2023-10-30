import { Box, type SelectChangeEvent, Typography } from '@mui/material'
import { Button, CustomSelect, Input } from 'components/atoms'
import {
  boxButtonStyles,
  loanBeforeStyles,
  notDebtorStyles
} from './add-loan.styled'
import { loanFields, frecuencesData, initialStates } from 'constant'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import { useState } from 'react'
import {
  type LoansInputsReturned,
  type AppStore,
  type LoansModel
} from 'models'
import { useDispatch, useSelector } from 'react-redux'
import { addUserLoan } from '../../../redux/states/user'
import { updateUser } from '../../../redux/states/users'
import { getSingleId } from 'utils'

interface AddLoanProps {
  setOpen: (value: boolean) => void
  setAlert: (value: boolean) => void
}

export default function AddLoan ({ setOpen, setAlert }: AddLoanProps) {
  const userLoans = useSelector((store: AppStore) => store.user_active)

  const dispatch = useDispatch()

  const [newLoan, setNewLoan] = useState<LoansInputsReturned>(
    initialStates.loansInputsReturned
  )

  const [existLoanBefore, setExistLoanBefore] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoan({
      ...newLoan,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    setNewLoan({
      ...newLoan,
      [e.target.name]: e.target.value
    })

    if (userLoans.loans.length > 0) {
      const exist = userLoans.loans.find(
        (item) => item.document === e.target.value
      )
      if (exist) setExistLoanBefore(true)
      else setExistLoanBefore(false)
    }
  }

  const handleSubmit = () => {
    const {
      deudor,
      frequence,
      initialAmount,
      interest,
      n_fees: nFees,
      reason
    } = newLoan

    const debtor = userLoans.debts.find((item) => item.document === deudor)
    const id = getSingleId()

    if (debtor && initialAmount && interest) {
      const { fullName, document } = debtor
      const newLoan: LoansModel = {
        id,
        fullName,
        document,
        initialAmount: Number(initialAmount),
        abonos: 0,
        date: new Date(),
        interest: Number(interest),
        n_fees: Number(nFees),
        frequence,
        reason,
        paid_fees: 0
      }
      if (newLoan) {
        dispatch(addUserLoan(newLoan))
        dispatch(
          updateUser({
            ...userLoans,
            loans: [...userLoans.loans, newLoan]
          })
        )
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
      {existLoanBefore && (
        <Typography variant="subtitle2" component="p" sx={loanBeforeStyles}>
          Este usuario ya tiene un prestamo activo
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <CustomSelect
          data={userLoans.debts}
          label="deudor"
          name="deudor"
          icon={<PersonRemoveOutlinedIcon />}
          onChange={handleChangeSelect}
        />
        {userLoans.debts.length === 0 && (
          <Typography variant="subtitle1" component="p" sx={notDebtorStyles}>
            No tienes deudores registrados
          </Typography>
        )}
        {loanFields.map((item, index) => (
          <Input key={index} {...item} onChange={handleChangeInput} />
        ))}
        <CustomSelect
          data={frecuencesData}
          label="tipo de prestamo"
          name="frequence"
          icon={<PersonRemoveOutlinedIcon />}
          onChange={handleChangeSelect}
        />
        <Box sx={boxButtonStyles}>
          <Button
            loading={false}
            text="registrar"
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
