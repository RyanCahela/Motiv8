import React, { Component } from 'react'

const UserContext = React.createContext();

class UserContextManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: '',
      password: '',
      email: ''
    }

    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
  }

  handleCreateAccountSubmit(e, userInfo) {
    e.preventDefault();

    this.setState({
      userName: userInfo.userName,
      password: userInfo.password,
      email: userInfo.email
    })


  }

  render() {
    const userContext = {
      methods: {
        handleCreateAccountSubmit: this.handleCreateAccountSubmit
      },
      state: this.state
    }

    return (
      <UserContext.Provider value={ userContext }>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export { UserContext, UserContextManager };
