import React from 'react'
import { UserContext } from '../contexts/UserContextManager';
import FavoritesListItem from '../components/FavoritesListItem';

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
          <ul>
            { favoritesList }
          </ul>
          </>
        )
      }}
    </UserContext.Consumer>
  )
}
