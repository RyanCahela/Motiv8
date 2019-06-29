import React from 'react'
import { QuoteContext } from '../../contexts/QuoteContextManager';

export default function QuoteControls() {

    return (
      <QuoteContext.Consumer>
        {({ methods }) => {
          return (
            <div className="quote-controls-container">
              <h5 className="quote-controls-heading">Randomize Options</h5>
              <div className="quote-controls">
                <input
                  onChange={(e) => methods.handleCheckboxCheck(e)}
                  type="checkbox"
                  id="keep-quote-checkbox" />
                <label className="quote-controls__label" htmlFor="keep-quote-checkbox">Keep Quote</label>
                <input
                  onChange={(e) => methods.handleCheckboxCheck(e)}
                  type="checkbox"
                  id="keep-fonts-checkbox" />
                <label className="quote-controls__label" htmlFor="keep-fonts-checkbox">Keep Fonts</label>
                <input
                  onChange={(e) => methods.handleCheckboxCheck(e)}
                  type="checkbox"
                  id="keep-background-checkbox" />
                <label className="quote-controls__label" htmlFor="keep-background-checkbox">Keep Background</label>
              </div>
            </div>
          )
        }}
      </QuoteContext.Consumer>
    )
  
}
