import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { publicRoutes } from 'constant'
import { type AppStore } from 'models'

const privateValidationFragment = <Outlet />
const publicValidationFragment = <Navigate replace to={publicRoutes.LOGIN} />

export default function AuthGuard () {
  const user = useSelector((store: AppStore) => store.user)
  return user.name ? privateValidationFragment : publicValidationFragment
}
