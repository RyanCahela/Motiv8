import React, { Component } from 'react'
import { UserContext } from '../contexts/UserContextManager';

export default class CreateAccountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    }

    this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleTextInput(e) {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'email-input':
        this.setState({
          email: e.target.value
        })
        break;
      case 'username-input':
        this.setState({
          userName: e.target.value
        })
        break;
      case 'password-input':
        this.setState({
          password: e.target.value
        })
        break;
      case 'password-confirm-input':
        this.setState({
          passwordConfirm: e.target.value
        })
        break;
      default:
        console.error("onChange id not found in create account form");
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ methods }) => {
          return (
            <>
              <h3>Create An Account</h3>
              <form className="input-form" onSubmit={(e) => methods.handleCreateAccountSubmit(e, this.state)}>
              <label htmlFor="email-input">Email:</label>
                <input 
                  id="email-input"
                  type="text"
                  onChange={(e) => this.handleTextInput(e)}/>

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

                <label htmlFor="password-confirm-input">Confirm Password</label>
                <input 
                  id="password-confirm-input" 
                  type="password" 
                  onChange={(e) => this.handleTextInput(e)}/>

                <input type="submit" />
              </form>
            </>
          )
        }}
      </UserContext.Consumer>
    )
  };
}
