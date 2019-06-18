import React from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContextManager';


export default function UserMenu(props) {

  return (
    <UserContext.Consumer>
      {({ state }) => {
        return (
          <ul>
            <li>
              <Link to={`/user/${state.id}`}>Profile</Link>
            </li>
            <li>
              <Link to={'/quotes'}>Quote Generator</Link>
            </li>
            <li>
              <Link to={`/logout`}>Logout</Link>
            </li>
          </ul>
        )
      }}
    </UserContext.Consumer>
  )
}
