import React from 'react';
import { QuoteContext } from '../../contexts/QuoteContextManager';

export default class QuoteDisplay extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <QuoteContext.Consumer>
        {({ state }) => {
          const dynamicBackgroundStyles = {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundImage: `url(${state.backgroundImageUrl})`,
          }

          const dynamicBodyFont = {
            fontFamily: state.fontPair['body']
          }
      
          const dynamicAuthorFont = {
            fontFamily: state.fontPair['author']
          }

          return (
            <div className="quote-display"style={dynamicBackgroundStyles}>
              <div className="quote-backdrop">
                <div className="quote-body" style={dynamicBodyFont}>{state.currentQuote.quote}</div>
                <div className="quote-author" style={dynamicAuthorFont}>{state.currentQuote.author}</div>
              </div>
            </div>
          )
        }}
      </QuoteContext.Consumer>
    )
  }
}
