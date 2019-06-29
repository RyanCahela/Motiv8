import React from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextManager';


export default function UserMenu(props) {

  return (
    <UserContext.Consumer>
      {({ state, methods }) => {
          return (
            <ul>
              <li>
                <Link to={`/user/${state.username}`}>Profile</Link>
              </li>
              <li>
                <Link to={'/quotes'}>Quote Generator</Link>
              </li>
              <li>
                <Link to={'/'} onClick={() => methods.handleLogout()}>Log Out</Link>
              </li>
            </ul>
          )
      }}
    </UserContext.Consumer>
  )
}
