import React from 'react'
import { QuoteContext } from '../contexts/QuoteContextManager';

export default function FavoritesListItem(props) {
  return (
    <QuoteContext.Consumer>
      {({ methods }) => {
        return (
          <li onClick={() => methods.handleFavoritesListItemClick(props.quote, props.history)}>
            <p>{props.quote.quote}</p>
            <p>{props.quote.author}</p>
          </li>
        )
      }}
    </QuoteContext.Consumer>
  )
}
