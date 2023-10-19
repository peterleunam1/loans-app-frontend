import { useNavigate } from 'react-router-dom'

export default function useNavigation () {
  const navigate = useNavigate()

  const goTo = (path: string) => {
    navigate(path, { replace: true })
  }

  return { goTo }
}
