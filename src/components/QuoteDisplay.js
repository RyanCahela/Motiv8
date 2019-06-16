import React from 'react';
import '../css/QuoteDisplay.css';
import { QuoteContext } from '../contexts/QuoteContextManager';

export default class QuoteDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <QuoteContext>
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
                <div className="quote-body" style={dynamicBodyFont}>{state.currentQuote.body}</div>
                <div className="quote-author" style={dynamicAuthorFont}>{state.currentQuote.author}</div>
              </div>
            </div>
          )
        }}
      </QuoteContext>
    )
  }
}
