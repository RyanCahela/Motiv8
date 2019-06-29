import React from 'react'
import FavoritesList from '../components/UserProfilePage/FavoritesList.js';

export default function UserProfilePage({ match, history }) {
  return (
    <div className="container">
      <FavoritesList history={history}/>
    </div>
  )
}

