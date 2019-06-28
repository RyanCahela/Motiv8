import React, { Component } from 'react'

const UserContext = React.createContext();

class UserContextManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      userId: 0,
      savedQuotes: []
    }

    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getUpdatedSavedQuotes = this.getUpdatedSavedQuotes.bind(this);
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
      console.log('login res', res);
      window.localStorage.setItem('motiv8-jwt', res.authToken)
      this.setState({
        isLoggedIn: true,
        username: userInfo.username,
        userId: res.userId,
        savedQuotes: res.savedQuotes
      })
    })
  }

  handleLogout() {
    window.localStorage.removeItem('motiv8-jwt');
    this.setState({
      isLoggedIn: false,
      userId: 0,
      username: '',
      savedQuotes: []
    })
  }

  getUpdatedSavedQuotes(userId) {
    fetch(`http://localhost:8000/api/savedQuotes/${userId}`)
      .then(res => res.json())
      .then(updatedQuotesList => {
        console.log('updated saved quotes', updatedQuotesList)
        this.setState({
          savedQuotes: updatedQuotesList
        })
      })
  }

  render() {
    const userContext = {
      methods: {
        handleCreateAccountSubmit: this.handleCreateAccountSubmit,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
        getUpdatedSavedQuotes: this.getUpdatedSavedQuotes,
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
