import React from 'react'
import '../css/quote.css';

export default class QuoteDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    console.log(this.props);
    const dynamicBackgroundStyles = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `url(${this.props.backgroundImageUrl})`,
    }
    return (
      <div className="quote-display"style={dynamicBackgroundStyles}>
        <div className="quote-backdrop">
          <div className="quote-body">{this.props.quote.body}</div>
          <div className="quote-author">{this.props.quote.author}</div>
        </div>
      </div>
    )
  }
}
