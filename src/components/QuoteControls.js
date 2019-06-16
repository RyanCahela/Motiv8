import React from 'react'
import '../css/quoteControls.css'
import { QuoteContext } from '../contexts/QuoteContextManager';

export default function QuoteControls(props) {
  return (
    <QuoteContext.Consumer>
      {({ methods }) => {
        return (
          <div className="btn-group">
            <label htmlFor="keep-quote-checkbox">Keep Quote</label>
            <input
              onChange={(e) => methods.handleCheckboxCheck(e)}
              type="checkbox" 
              id="keep-quote-checkbox" />
            <label htmlFor="keep-fonts-checkbox">Keep Fonts</label>
            <input
              onChange={(e) => methods.handleCheckboxCheck(e)}
              type="checkbox" 
              id="keep-fonts-checkbox" />
            <label htmlFor="keep-background-checkbox">Keep Background</label>
            <input
              onChange={(e) => methods.handleCheckboxCheck(e)}
              type="checkbox" 
              id="keep-background-checkbox" />
          </div>
        )
      }}
    </QuoteContext.Consumer>
  )
}
