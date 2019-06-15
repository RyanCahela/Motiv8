import React, { Component } from 'react'

export default class CreateAccountForm extends Component {

  state = {
    email: '',
    userName: '',
    password: '',
    passwordMatch: '',
  }

  render() {
    return (
      <>
      <h3>Create An Account</h3>
      <form class="input-form">
        <label htmlFor="userName-input">Username:</label>
        <input id="userName-input"type="text" onChange={this.handleTextInput}/>
        <label>Password:</label>
        <input type="password" />
        <label>Confirm Password</label>
        <input type="password" />
        <input type="submit" />
      </form>
      </>
    )
  };
}
