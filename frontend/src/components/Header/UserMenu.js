import React from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextManager';


export default function UserMenu(props) {

  return (
    <UserContext.Consumer>
      {({ state, methods }) => {
          return (
            <ul class="user-menu">
              <NavLink className="user-menu__list-item__link" to={`/user/${state.username}`}>
                <li class="user-menu__list-item">
                  Profile
                </li>
              </NavLink>
              <NavLink className="user-menu__list-item__link" to={'/quotes'}>
                <li className="user-menu__list-item">
                  Quote Generator
                </li>
              </NavLink>
              <NavLink className="user-menu__list-item__link" to={'/'} onClick={() => methods.handleLogout()}>
                <li className="user-menu__list-item">
                  Log Out
                </li>
              </NavLink>
            </ul>
          )
      }}
    </UserContext.Consumer>
  )
}
