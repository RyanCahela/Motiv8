import React from 'react'
import { GlobalContext } from '../../contexts/GlobalContextManager';
import FavoritesListItem from './FavoritesListItem';

export default function FavoritesList({ history }) {
  return (
    <GlobalContext.Consumer>
      {({ state }) => {

        let favoritesList = state.savedQuotes.map((quote) => {
          return (
            <FavoritesListItem key={quote.id} quote={quote} history={history}/>
          )
        })
        console.log(favoritesList);

        return (
          <>
          <h3 className="favorites-list-heading">Favorites</h3>
          <ul className="favorites-list">
            { favoritesList }
          </ul>
          </>
        )
      }}
    </GlobalContext.Consumer>
  )
}
