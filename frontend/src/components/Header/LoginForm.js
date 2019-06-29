import React, { Component } from 'react'
import { UserContext } from '../../contexts/UserContextManager';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }


  handleTextInput(e) {
    switch (e.target.id) {
      case 'username-input':
        this.setState({
          username: e.target.value
        })
        break;
      case 'password-input':
        this.setState({
          password: e.target.value
        })
        break;
      default:
          console.error("onChange id not found in login form");
    }
  }

  render() {

    return (
      <UserContext.Consumer>
        {({methods}) => {
          return (
            <>
            <h3>Sign In</h3>
            <form className="input-form" onSubmit={(e) => methods.handleLogin(e, this.state)}>
              <label htmlFor="username-input">Username:</label>
              <input 
                id="username-input"
                type="text"
                onChange={(e) => this.handleTextInput(e)}/>

              <label htmlFor="password-input">Password:</label>
              <input 
                id="password-input" 
                type="password" 
                onChange={(e) => this.handleTextInput(e)} />

              <input type="submit" />
            </form>
            </>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
