import React, { Component } from 'react'

const UserContext = React.createContext();

class UserContextManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      email: '',
      userId: 0,
      favoritesList: []
    }

    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleCreateAccountSubmit(e, userInfo) {
    e.preventDefault();
    console.log(userInfo);
    const data = {
      username: userInfo.username,
      password: userInfo.password
    }

    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
  }

  handleLogin(e, userInfo) {
    e.preventDefault();
    console.log(userInfo);
    const data = {
      username: userInfo.username,
      password: userInfo.password
    }

    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      //TODO build token services for crud on tokens to refresh
      window.localStorage.setItem('motiv8-jwt', res.authToken)
      this.setState({
        isLoggedIn: true,
        userId: res.userId
      })
    })
  }

  handleLogout() {
    window.localStorage.removeItem('motiv8-jwt');
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const userContext = {
      methods: {
        handleCreateAccountSubmit: this.handleCreateAccountSubmit,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout
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
