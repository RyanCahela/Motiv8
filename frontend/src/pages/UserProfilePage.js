import React from 'react'
import Menu from '../components/Menu';
import FavoritesList from '../components/FavoritesList.js';
import AccountDetails from '../components/AccountDetails';
import { UserContext } from '../contexts/UserContextManager';

export default function UserProfilePage({ match, history }) {
  return (
    <div>
      <Menu />
      <FavoritesList history={history}/>
      <AccountDetails />
    </div>
  )
}

