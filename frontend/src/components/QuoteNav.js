import React from 'react'
import { QuoteContext } from '../contexts/QuoteContextManager';
import { UserContext } from '../contexts/UserContextManager';

export default function QuoteNav() {
  return (
    <UserContext.Consumer>
      {({ state, methods }) => {
        let userMethods = methods;
        return (
          <QuoteContext.Consumer>
            {({ methods }) => {
              return (
                <div>
                  <button onClick={() => methods.handleUndo()}>Undo</button>
                  <button onClick={() => methods.handleRandomize()}>Randomize</button>
                  <button onClick={() => methods.handleSaveQuote(state.userId, userMethods.getUpdatedSavedQuotes)}>Save</button>
                </div>
              )
            }}
          </QuoteContext.Consumer>
        )
      }}
    </UserContext.Consumer>
  )
}
