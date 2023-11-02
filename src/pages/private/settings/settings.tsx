import { Button } from 'components/atoms'
import { AppLayout } from 'components/templates'
import { privateRoutes, publicRoutes } from 'constant'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../redux/states/user'
import { useNavigation } from 'hooks'

export default function Settings () {
  const dispatch = useDispatch()
  const { goTo } = useNavigation()
  const handleLogout = () => {
    console.log('log out')
    dispatch(logOut())
    goTo(`/${publicRoutes.LOGIN}`)
  }
  return (
    <AppLayout title={privateRoutes.SETTINGS}>
      <Button loading={false} onClick={handleLogout} text='cerrar sesión' />
    </AppLayout>
  )
}
