import React, { useContext} from 'react'
import { AuthContext } from '../context/auth.context'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export const Navbar = () => {
  const auth = useContext(AuthContext)
  const database = auth.ALLusers
  /*const createCustomInsertButton = () =>{
    return(
      <DeleteButton style={ { color: 'black' }} afterDeleteRow = {afterDeleteRow}>Удалить пользователя</DeleteButton>
    )
  }
  */

  function afterDeleteRow(rows) {
    if (rows.indexOf(auth.userId, 0) !== -1){
        auth.del()
    }
  }

  function onBlock () {
    alert("Сегодня все под защитой сильнейшего дракона Эрнеста, но можешь попытаться удалить кого-то... ")
  }

  function unBlock() {
    alert("Спасиюо, что помогаешь бороться с преступностью!")
  }
  const options = {
    onDeleteRow: afterDeleteRow,
  }
  const selectRowProp ={
    mode: "checkbox",
    bgColor: 'red',
  }
  const logoutHandler = event => {
    alert("Как жаль расстоваться(((")
    event.preventDefault()
    auth.logout()
  }

  return (
    <nav>
      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" className="btn btn-secondary" onClick={onBlock}>Заблокировать</button>
          <button type="button" className="btn btn-secondary" onClick={unBlock}>Разблокировать</button>
          <button type="button" className="btn btn-secondary" onClick={logoutHandler }>Выйти с аккаунта</button>
        </div>
      </div>
      <div>
        <BootstrapTable data={database}  deleteRow={true} selectRow={selectRowProp} options={options} >
          <TableHeaderColumn dataField="_id" isKey={true} width="30%">ID</TableHeaderColumn>
          <TableHeaderColumn dataField="dataRegistration" width="40%">Дата регистрации</TableHeaderColumn>
          <TableHeaderColumn dataField="login" width="25%">Логин</TableHeaderColumn>
          <TableHeaderColumn dataField="email" width="25%">Электронная почта</TableHeaderColumn>
        </BootstrapTable>
      </div>
    </nav>
  )
}

