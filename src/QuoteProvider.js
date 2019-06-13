import React, { Component } from 'react'

const quoteProvider = React.createContext();

export default class QuoteProvider extends Component {


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
