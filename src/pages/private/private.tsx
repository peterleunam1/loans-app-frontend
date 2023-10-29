import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { privateRoutes } from 'constant'
import { RoutesWithNotFound } from 'utils'

const Dashboard = lazy(async () => await import('./dashboard/dashboard'))
const Loans = lazy(async () => await import('./loans/loans'))
const Debts = lazy(async () => await import('./debts/debts'))
const Settings = lazy(async () => await import('./settings/settings'))
const Pays = lazy(async () => await import('./pays/pays'))
const Cash = lazy(async () => await import('./cash/cash'))
const LoansDetail = lazy(async () => await import('./loans-detail/loans-detail'))

export default function Private () {
  return (
    <RoutesWithNotFound>
      <Route path={privateRoutes.HOME} element={<Dashboard />} />
      <Route path={privateRoutes.LOANS} element={<Loans />} />
      <Route path={privateRoutes.DEBTS} element={<Debts />} />
      <Route path={privateRoutes.SETTINGS} element={<Settings />} />
      <Route path={privateRoutes.PAY} element={<Pays />} />
      <Route path={privateRoutes.CASH} element={<Cash />} />
      <Route path={privateRoutes.LOANS_DETAIL} element={<LoansDetail />} />
    </RoutesWithNotFound>
  )
}
