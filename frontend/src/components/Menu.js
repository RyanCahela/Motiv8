import React from 'react';
import AccountAccessForms from './AccountAccessForms';
import '../css/Menu.css';
import UserMenu from './UserMenu';
import { UserContext } from '../contexts/UserContextManager';

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
    return (
      <UserContext.Consumer>
        {({ state }) => {
          if(this.state.menuIsOpen) {
            return (
              <div className="menu">
                <header>
                  <button onClick={this.toggleMenuIsOpen}>Menu</button>
                  <span>loggedIn? {`${state.isLoggedIn}`}</span>
                </header>
                {state.isLoggedIn? <UserMenu /> : <AccountAccessForms />}
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
      </UserContext.Consumer>
    )
  }    
}
