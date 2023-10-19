import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { RoutesWithNotFound } from 'utils'
import { publicRoutes, privateRoutes } from 'constant'
import { AuthGuard } from 'guards'
import { store } from '../redux'
const Login = lazy(async () => await import('../pages/public/login/login'))
const Private = lazy(async () => await import('../pages/private/private'))

function App () {
  return (
   <Suspense fallback={<>Loading...</>}>
    <Provider store={store}>
     <BrowserRouter>
      <RoutesWithNotFound>
        <Route
          path={privateRoutes.HOME}
          element={<Navigate to={privateRoutes.PRIVATE} />}
        />
        <Route path={publicRoutes.LOGIN} element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path={`${privateRoutes.PRIVATE}/*`} element={<Private />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
   </Provider>
    </Suspense>
  )
}

export default App
