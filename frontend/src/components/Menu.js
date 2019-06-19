import React from 'react';
import CreateAccountForm from './CreateAccountForm';
import '../css/Menu.css';
import UserMenu from './UserMenu';

export default class Menu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menuIsOpen: false,
      userIsLoggedIn: true
    }

    this.toggleMenuIsOpen = this.toggleMenuIsOpen.bind(this);
  }

  toggleMenuIsOpen() {
    this.setState((currentState) => {
      return {
        menuIsOpen: !currentState.menuIsOpen
      }
    })
  }
  

  render() {

    if(this.state.menuIsOpen) {
      return (
        <div className="menu">
          <header>
            <button onClick={this.toggleMenuIsOpen}>Menu</button>
          </header>
          {this.state.userIsLoggedIn? <UserMenu /> : <CreateAccountForm />}
        </div>
      )
    }
    else {
      return (
        <div className="menu">
          <header>
            <button onClick={this.toggleMenuIsOpen}>Menu</button>
          </header>
        </div>
      )
    }
  }
}
