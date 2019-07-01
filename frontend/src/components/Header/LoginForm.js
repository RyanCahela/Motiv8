import React, { Component } from 'react'
import { GlobalContext } from '../../contexts/GlobalContextManager';

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
      <GlobalContext.Consumer>
        {({methods}) => {
          return (
            <div>
            <h3 className="login-heading">Sign In</h3>
            <form className="input-form" onSubmit={(e) => methods.handleLogin(e, this.state)}>
              <label className="input-form__label" htmlFor="username-input">Username</label>
              <input 
                id="username-input"
                type="text"
                onChange={(e) => this.handleTextInput(e)}/>

              <label className="input-form__label" htmlFor="password-input">Password</label>
              <input 
                id="password-input" 
                type="password" 
                onChange={(e) => this.handleTextInput(e)} />

              <input className="input-form__submit" type="submit" value="Sign In"/>
            </form>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    )
  }
}
