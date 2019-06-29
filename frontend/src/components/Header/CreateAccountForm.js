import React, { Component } from 'react'
import { UserContext } from '../../contexts/UserContextManager';

export default class CreateAccountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
    }

    this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleTextInput(e) {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'create-username-input':
        this.setState({
          username: e.target.value
        })
        break;
      case 'create-password-input':
        this.setState({
          password: e.target.value
        })
        break;
      case 'create-password-confirm-input':
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

                <label htmlFor="username-input">Username:</label>
                <input 
                  id="create-username-input"
                  type="text"
                  onChange={(e) => this.handleTextInput(e)}/>

                <label htmlFor="password-input">Password:</label>
                <input 
                  id="create-password-input" 
                  type="password" 
                  onChange={(e) => this.handleTextInput(e)} />

                <label htmlFor="password-confirm-input">Confirm Password</label>
                <input 
                  id="create-password-confirm-input" 
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
