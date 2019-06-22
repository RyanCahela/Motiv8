import React from 'react'
import { QuoteContext } from '../contexts/QuoteContextManager';
import { UserContext } from '../contexts/UserContextManager';

export default function QuoteNav() {
  return (
    <UserContext.Consumer>
      {({ state }) => {
        return (
          <QuoteContext.Consumer>
            {({ methods }) => {
              return (
                <div>
                  <button onClick={() => methods.handleUndo()}>Undo</button>
                  <button onClick={() => methods.handleRandomize()}>Randomize</button>
                  <button onClick={() => methods.handleSaveQuote(state.userId)}>Save</button>
                </div>
              )
            }}
          </QuoteContext.Consumer>
        )
      }}
    </UserContext.Consumer>
  )
}
