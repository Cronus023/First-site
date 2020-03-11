import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  ALLusers: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  userIsBlocked: false,
  userIsDeleted: false,
  deletedUsers:null
})