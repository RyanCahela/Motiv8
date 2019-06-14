import React from 'react'
import '../css/quote.css';

export default class QuoteDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    const dynamicBackgroundStyles = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `url(${this.props.backgroundImageUrl})`,
    }
    const dynamicBodyFont = {
      fontFamily: this.props.fontPair['body']
    }

    const dynamicAuthorFont = {
      fontFamily: this.props.fontPair['author']
    }
    return (
      <div className="quote-display"style={dynamicBackgroundStyles}>
        <div className="quote-backdrop">
          <div className="quote-body" style={dynamicBodyFont}>{this.props.quote.body}</div>
          <div className="quote-author" style={dynamicAuthorFont}>{this.props.quote.author}</div>
        </div>
      </div>
    )
  }
}
