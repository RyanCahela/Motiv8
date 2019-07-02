import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from '../components/Header/Menu';
import LandingPage from '../pages/LandingPage';
import QuoteEditorPage from '../pages/QuoteEditorPage';
import UserProfilePage from '../pages/UserProfilePage';
import { GlobalContext } from '../contexts/GlobalContextManager';

export default function Router(props) {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/quotes" component={QuoteEditorPage} />
        <GlobalContext.Consumer>
          {({ state, methods }) => {
            return (
              <Route 
                path="/user/:username" 
                render={(props) => <UserProfilePage
                  {...props}
                  getUpdatedSavedQuotes={methods.getUpdatedSavedQuotes}
                  userId={state.userId}/>} 
                />
            )
          }}
        </GlobalContext.Consumer>
      </Switch>
    </BrowserRouter>
  )
}
