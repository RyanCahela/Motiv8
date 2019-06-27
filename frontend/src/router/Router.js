import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from '../components/Menu';
import LandingPage from '../pages/LandingPage';
import QuoteEditorPage from '../pages/QuoteEditorPage';
import LoginPage from '../pages/LoginPage';
import UserProfilePage from '../pages/UserProfilePage';

export default function Router(props) {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/quotes" component={QuoteEditorPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user/:username" component={UserProfilePage} />
      </Switch>
    </BrowserRouter>
  )
}
