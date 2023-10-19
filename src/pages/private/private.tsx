import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { privateRoutes } from 'constant'
import { RoutesWithNotFound } from 'utils'

const Dashboard = lazy(async () => await import('./dashboard/dashboard'))
const Loans = lazy(async () => await import('./loans/loans'))
const Debts = lazy(async () => await import('./debts/debts'))
export default function Private () {
  return (
    <RoutesWithNotFound>
      <Route path={privateRoutes.HOME} element={<Dashboard />} />
      <Route path={privateRoutes.LOANS} element={<Loans />} />
      <Route path={privateRoutes.DEBTS} element={<Debts />} />
    </RoutesWithNotFound>
  )
}
