import { LoadingButton } from '@mui/lab'
import AddIcon from '@mui/icons-material/Add'
import { buttonStyles } from './button.styled'
import { getCapitalize } from 'utils'

interface ButtonProps {
  onClick: () => void
  loading: boolean
  withIcon?: boolean
  text: string
  isDisabled?: boolean
}
export default function Button ({ isDisabled, loading, withIcon, text, onClick }: ButtonProps) {
  const textCapitalized = getCapitalize(text)
  const handleClick = () => {
    onClick()
  }
  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      sx={buttonStyles}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {textCapitalized}
      {withIcon && <AddIcon />}
    </LoadingButton>
  )
}
