import React from 'react'
import { UserContext } from '../contexts/UserContextManager';
import FavoritesListItem from '../components/FavoritesListItem';
import { Link } from 'react-router-dom';

export default function FavoritesList({ history }) {
  return (
    <UserContext.Consumer>
      {({ methods, state }) => {


        let favoritesList = state.savedQuotes.map((quote) => {
          return (
              <FavoritesListItem key={quote.id} quote={quote} onClick={() => methods.handleFavoritesListItemClick(quote)}/>
          )
        })

        return (
          <ul>
            { favoritesList }
          </ul>
        )
      }}
    </UserContext.Consumer>
  )
}
