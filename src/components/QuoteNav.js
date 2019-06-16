import React from 'react'
import { QuoteContext } from '../contexts/QuoteContextManager';

export default function QuoteNav(props) {
  return (
    <QuoteContext.Consumer>
      {({ methods }) => {
        return (
          <div>
            <button onClick={() => methods.handleUndo()}>Undo</button>
            <button onClick={() => methods.handleRandomize()}>Randomize</button>
            <button>Save</button>
          </div>
        )
      }}
    </QuoteContext.Consumer>
  )
}
