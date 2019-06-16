import React from 'react';
import CreateAccountForm from '../components/CreateAccountForm';
import { UserContext } from '../contexts/UserContextManager';

export default function LoginPage({ history }) {
  
  return (
    <UserContext.Consumer>
      {({ state }) => {
        if(state.isLoggedIn) {
          history.push('/quote')
        }
        else{
          return(
            <CreateAccountForm />
          )    
        }
      }}
    </UserContext.Consumer>
  )
}
