import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../redux/states/user'
import { createUser } from '../../../redux/states/users'
import { privateRoutes, publicRoutes, regexs } from 'constant'
import { useNavigation } from 'hooks'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import { Alert, Box, Typography } from '@mui/material'
import { Button, Input } from 'components/atoms'
import { type AppStore, type UserModel } from 'models'
import { useState } from 'react'

const datarRegister = [
  {
    name: 'name',
    label: 'nombres',
    regex: regexs.TEXT,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'text'
  },
  {
    name: 'lastName',
    label: 'apellidos',
    regex: regexs.TEXT,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'text'
  },
  {
    name: 'email',
    label: 'correo electrónico',
    regex: regexs.EMAIL,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'email'
  },
  {
    name: 'password',
    label: 'contraseña',
    regex: regexs.PASSWORD,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'password'
  },
  {
    name: 'document',
    label: 'documento de indentidad',
    regex: regexs.NUMBERS,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'number'
  },
  {
    name: 'department',
    label: 'departamento',
    regex: regexs.TEXT,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'text'
  },
  {
    name: 'city',
    label: 'ciudad',
    regex: regexs.TEXT,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'text'
  },
  {
    name: 'born',
    label: 'fecha de nacimiento',
    regex: regexs.TEXT,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'text'
  }
]
const datarLogin = [
  {
    name: 'email',
    label: 'correo electrónico',
    regex: regexs.EMAIL,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'email'
  },
  {
    name: 'password',
    label: 'contraseña',
    regex: regexs.PASSWORD,
    icon: <AttachMoneyOutlinedIcon />,
    type: 'password'
  }
]
export const initialStateRegister = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  document: 0,
  department: '',
  city: '',
  born: ''
}
interface LoginModel {
  email: string
  password: string
}
export default function Login () {
  const dispatch = useDispatch()
  const { goTo } = useNavigation()
  const [register, setRegister] = useState<UserModel>(initialStateRegister)
  const [login, setLogin] = useState<LoginModel>({ email: '', password: '' })
  const users = useSelector((store: AppStore) => store.users)
  const [alert, setAlert] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginU = () => {
    const user = users.find(user => user.email === login.email && user.password === login.password)
    if (user) {
      dispatch(setUser(user))
      setAlert('Bienvenido')
      goTo(`/${privateRoutes.PRIVATE}`)
    } else {
      setAlert('Usuario o contraseña incorrect')
    }
  }

  const handleRegister = () => {
    if (users.find(user => user.email === register.email)) {
      setAlert('El correo ya existe')
    } else if (users.find(user => user.document === register.document)) {
      setAlert('El documento ya existe')
    } else {
      dispatch(createUser({
        ...register,
        loans: [],
        debts: []
      }))
      setAlert('Usuario creado con éxito')
    }
  }
  const handleRedirectToPay = () => {
    goTo(`/${publicRoutes.PAY_INIT}`)
  }
  return (
    <div>
      <h1>Login</h1>
      {
        datarLogin.map((item, index) => (
          <Input key={index} {...item} onChange={handleChangeLogin} />
        ))
      }
      <button onClick={handleLoginU}>iniciar sesión</button>
      {alert && <Alert>{alert}</Alert>}
      <hr />
      <button onClick={handleRedirectToPay}>
        pagar
      </button>
      <Typography variant="h3" component="h2">
        Registro
      </Typography>
     <Box sx={{ width: '50%', m: '0 auto', p: 5 }}>
     {datarRegister.map((item, index) => (
        <Input key={index} {...item} onChange={handleChange} />
     ))}
     <Button loading={false} text='registrarse' onClick={handleRegister} />
     </Box>
    </div>
  )
}
