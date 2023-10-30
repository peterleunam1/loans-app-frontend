import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { RoutesWithNotFound } from 'utils'
import { publicRoutes, privateRoutes } from 'constant'
import { AuthGuard } from 'guards'
import { store } from '../redux'
import { theme } from './theme/app-theme.styled'

const Login = lazy(async () => await import('../pages/public/login/login'))
const PayInit = lazy(async () => await import('../pages/public/pays-init/pays-init'))
const Private = lazy(async () => await import('../pages/private/private'))

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
