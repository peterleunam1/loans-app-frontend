import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/states/user'
import { privateRoutes } from 'constant'
import { useNavigation } from 'hooks'

export default function Login () {
  const dispatch = useDispatch()
  const { goTo } = useNavigation()

  const handleLogin = () => {
    dispatch(setUser({ name: 'Jhon Doe' }))
    goTo(`/${privateRoutes.PRIVATE}`)
  }
  return (
    <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>iniciar sesión</button>
    </div>
  )
}
