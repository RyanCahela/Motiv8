import React from 'react'
import { UserContext } from '../../contexts/UserContextManager';
import FavoritesListItem from './FavoritesListItem';

export default function FavoritesList({ history }) {
  return (
    <UserContext.Consumer>
      {({ state }) => {

        let favoritesList = state.savedQuotes.map((quote) => {
          return (
            <FavoritesListItem key={quote.id} quote={quote} history={history}/>
          )
        })
        console.log(favoritesList);

        return (
          <>
          <h3>Favorites</h3>
          <ul className="favorites-list">
            { favoritesList }
          </ul>
          </>
        )
      }}
    </UserContext.Consumer>
  )
}
