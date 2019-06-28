import React from 'react'
import FavoritesList from '../components/FavoritesList.js';
import '../css/UserProfilePage.css';

export default function UserProfilePage({ match, history }) {
  return (
    <div className="container">
      <FavoritesList history={history}/>
    </div>
  )
}

