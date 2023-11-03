import { type DebtsModel } from './debts.model'
import { type LoansModel } from './loans.models'

export interface AppStore {
  user_active: UserCompleteModel
  users: UserModel[]
  owner: UserCompleteModel
}
export interface ChildrenModel {
  children: React.ReactNode
}
export interface UserModel {
  name: string
  lastName: string
  email: string
  password: string
  document: number
  department: string
  city: string
  born: string
}
export interface UserCompleteModel extends UserModel {
  loans: LoansModel[]
  debts: DebtsModel[]
}
