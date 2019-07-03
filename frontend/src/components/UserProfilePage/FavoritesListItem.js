import React from 'react'
import { GlobalContext } from '../../contexts/GlobalContextManager';

export default function FavoritesListItem(props) {
  return (
    <GlobalContext.Consumer>
      {({ methods }) => {

        const quoteFont={
          fontFamily: props.quote.bodyfont
        }

        const authorFont = {
          fontFamily: props.quote.authorfont,
        }


        return (
          <li className="favorites-list-item">
            <div>
              <p style={quoteFont}>{props.quote.quote}</p>
              <p style={authorFont}>{props.quote.author}</p>
              <button onClick={() => methods.handleFavoritesListItemClick(props.quote, props.history)}>Edit</button>
              <button onClick={() => methods.handleDeleteFavoritesListItem(props.savedQuoteId)}>Delete</button>
            </div>
            <img className="favorites-list-item-img" alt='' src={props.quote.backgroundimageurl}></img>
          </li>
        )
      }}
    </GlobalContext.Consumer>
  )
}
