import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'
const storageName1 = 'delete'
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userIsBlocked, setUserIsBlocked] = useState(false)
  const [userIsDeleted, setUserIsDeleted] = useState(false)
  const [ALLusers, setUsers] = useState(null)
  const [deletedUsers, setDeletedUsers] = useState(null)

  const login = useCallback((jwtToken, id,users,isBlocked,isDeleted,DeletedUsers) => {
    setToken(jwtToken)
    setUserIsBlocked(isBlocked)
    setUserIsDeleted(isDeleted)
    setDeletedUsers(DeletedUsers)
    setUsers(users)
    setUserId(id)
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, ALLusers:users
    }))
    localStorage.setItem(storageName1, JSON.stringify({
    userIsBlocked:isBlocked, userIsDeleted:isDeleted, deletedUsers: DeletedUsers
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])
 
  const del = useCallback(() => {
    setUserIsDeleted(true)
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    const data1 = JSON.parse(localStorage.getItem(storageName1))
    if (data && data.token) {
      login(data.token, data.userId, data.ALLusers, data1.userIsDeleted,data1.deletedUsers)
    }

    setReady(true)
  }, [login])

  return { login, logout, del, token, userId,ready, ALLusers,userIsBlocked, userIsDeleted, deletedUsers}
}