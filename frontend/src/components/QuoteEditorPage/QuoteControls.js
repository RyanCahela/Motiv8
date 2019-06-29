import React from 'react'
import { QuoteContext } from '../../contexts/QuoteContextManager';

export default function QuoteControls(props) {



    return (
      <QuoteContext.Consumer>
        {({ methods }) => {
          return (
            <div className="QuoteControls-checkbox-group">
              <input
                onChange={(e) => methods.handleCheckboxCheck(e)}
                type="checkbox"
                id="keep-quote-checkbox" />
              <label htmlFor="keep-quote-checkbox">Keep Quote</label>
              <input
                onChange={(e) => methods.handleCheckboxCheck(e)}
                type="checkbox"
                id="keep-fonts-checkbox" />
              <label htmlFor="keep-fonts-checkbox">Keep Fonts</label>
              <input
                onChange={(e) => methods.handleCheckboxCheck(e)}
                type="checkbox"
                id="keep-background-checkbox" />
              <label htmlFor="keep-background-checkbox">Keep Background</label>
            </div>
          )
        }}
      </QuoteContext.Consumer>
    )
  
}
