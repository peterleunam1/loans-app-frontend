import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { publicRoutes } from 'constant'
import { type AppStore } from 'models'

const privateValidationFragment = <Outlet />
const publicValidationFragment = <Navigate replace to={publicRoutes.PAY_INIT} />

export default function PaymentsGuard () {
  const user = useSelector((store: AppStore) => store.owner)
  return user.name ? privateValidationFragment : publicValidationFragment
}
