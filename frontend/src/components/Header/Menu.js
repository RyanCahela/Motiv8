import React from 'react';
import AccountAccessForms from './AccountAccessForms';
import UserMenu from './UserMenu';
import { GlobalContext } from '../../contexts/GlobalContextManager';

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
      <GlobalContext.Consumer>
        {({ state }) => {
          if(this.state.menuIsOpen) {
            return (
              <div className="menu-container">
                <header className="menu">
                  <button className="menu__button" onClick={this.toggleMenuIsOpen}>X</button>
                  <div>{state.isLoggedIn? `Welcome ${state.username}`: ''}</div>
                  {state.isLoggedIn? <UserMenu toggleMenuIsOpen={this.toggleMenuIsOpen}/> : <AccountAccessForms />}
                </header>
              </div>
            )
          }
          else {
            return (
              <div className="menu-container">
                <header className="menu">
                  <button className="menu__button" onClick={this.toggleMenuIsOpen}>Menu</button>
                  <div className="menu__greeting">{state.isLoggedIn? `Welcome ${state.username}`: ''}</div>
                </header>
              </div>
            )
          }
        }
        }
      </GlobalContext.Consumer>
    )
  }    
}
