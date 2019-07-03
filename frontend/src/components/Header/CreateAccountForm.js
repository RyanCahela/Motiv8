import React, { Component } from 'react'
import { GlobalContext } from '../../contexts/GlobalContextManager';

export default class CreateAccountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
    }

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
      <GlobalContext.Consumer>
        {({ methods }) => {
          return (
            <>
              <h3 className="create-account-heading">Create An Account</h3>
              <form 
                className="create-account-form" 
                onSubmit={(e) => {
                  methods.handleCreateAccountSubmit(e, this.state);
                  this.props.setIsInCreateAccountModeFalse();
                }}>

                <label className="create-account-form__label" htmlFor="username-input">Username:</label>
                <input 
                  id="create-username-input"
                  type="text"
                  onChange={(e) => this.handleTextInput(e)}/>

                <label className="create-account-form__label" htmlFor="password-input">Password:</label>
                <input 
                  id="create-password-input" 
                  type="password" 
                  onChange={(e) => this.handleTextInput(e)} />

                <label className="create-account-form__label" htmlFor="password-confirm-input">Confirm Password</label>
                <input 
                  id="create-password-confirm-input" 
                  type="password" 
                  onChange={(e) => this.handleTextInput(e)}/>

                <input className="create-account-form__submit" type="submit" value="Create Account"/>
              </form>
            </>
          )
        }}
      </GlobalContext.Consumer>
    )
  };
}
