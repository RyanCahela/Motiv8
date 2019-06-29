import React from 'react'
import { QuoteContext } from '../../contexts/QuoteContextManager';

export default function FavoritesListItem(props) {
  return (
    <QuoteContext.Consumer>
      {({ methods }) => {

        const quoteFont={
          fontFamily: props.quote.bodyfont
        }

        const authorFont = {
          fontFamily: props.quote.authorfont,
        }


        return (
          <li className="favorites-list-item" onClick={() => methods.handleFavoritesListItemClick(props.quote, props.history)}>
            <div>
              <p style={quoteFont}>{props.quote.quote}</p>
              <p style={authorFont}>{props.quote.author}</p>
            </div>
            <img className="favorites-list-item-img" alt='' src={props.quote.backgroundimageurl}></img>
          </li>
        )
      }}
    </QuoteContext.Consumer>
  )
}
