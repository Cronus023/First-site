import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const date = new Date()
  const [form, setForm] = useState({
    login: '', password: '', email: '', userIsDeleted : false, deletedUsers:[],userIsBlocked:false,dataLogin: date
    })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value ,
      userIsDeleted : auth.userIsDeleted,
      deletedUsers: auth.deletedUsers
    })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form})
      auth.login(data.token, data.userId, data.ALLusers, data.userIsBlocked,data.userIsDeleted, data.deletedUsers,data.dataLogin)
    } catch (e) { }
  }
  return (
    <div className="container">
      <div>
        <h1>Авторизация</h1>
        <div >
          <div>
            <form>

              <div className="form-group">
                <label htmlFor="email" >Email:</label>
                <div>
                <input //className="form-control"
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                 
                  value={form.email}
                  onChange={changeHandler}
                  
                />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Логин: </label>
                <div>
                <input
               // className="form-control"
                  placeholder="Введите логин"
                  id="login"
                  type="text"
                  name="login"
                 
                  value={form.login}
                  onChange={changeHandler}
                />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Пароль: </label>
                <div>
                <input
                  //className="form-control"
                  
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
          
                  value={form.password}
                  onChange={changeHandler}
                />
          
              </div>
             </div>
            </form>

          </div>

          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
              <button type="button" className="btn btn-secondary" disabled={loading} onClick={loginHandler} > Войти</button>
              <button type="button" className="btn btn-secondary" disabled={loading} onClick={registerHandler} >Регистрация</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

