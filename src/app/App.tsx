import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { RoutesWithNotFound } from 'utils'
import { publicRoutes, privateRoutes } from 'constant'
import { AuthGuard, PaymentsGuard } from 'guards'
import { store } from '../redux'
import { theme } from './theme/app-theme.styled'

const Login = lazy(async () => await import('../pages/public/login/login'))
const PayInit = lazy(async () => await import('../pages/public/pays-init/pays-init'))
const Private = lazy(async () => await import('../pages/private/private'))
const PaysOne = lazy(async () => await import('../pages/public/pays-flow/pays-one/pays-one.component'))
const PaysTwo = lazy(async () => await import('../pages/public/pays-flow/pays-two/pays-two'))

function App () {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route
                path={privateRoutes.HOME}
                element={<Navigate to={privateRoutes.PRIVATE} />}
              />
              <Route path={publicRoutes.LOGIN} element={<Login />} />
              <Route path={publicRoutes.PAY_INIT} element={<PayInit />} />
             <Route element={<PaymentsGuard/>}>
              <Route path={publicRoutes.PAY_ONE} element={<PaysOne />} />
              <Route path={publicRoutes.PAY_TWO} element={<PaysTwo />} />
            </ Route>
              <Route element={<AuthGuard />}>
                <Route
                  path={`${privateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
