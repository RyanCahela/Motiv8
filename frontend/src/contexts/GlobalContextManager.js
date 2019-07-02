import React from 'react';
import fontPairings from '../fonts/fontPairings';
import IteratorServices from '../services/IteratorServices';
import TokenServices from'../services/TokenServices';
import jwt from 'jsonwebtoken';

const GlobalContext = React.createContext();

class GlobalContextManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //quote info
      quotes: [],
      currentQuote: '',
      backgroundImageUrls: [],
      fontPairings: [...fontPairings],
      backgroundImageUrl: '',
      fontPair: {},
      previousBackgroundImageUrl: '',
      previousFontPair: {},
      keepBackground: false,
      keepFonts: false,
      keepQuote: false,

      //user info
      isLoggedIn: false,
      username: '',
      userId: 0,
      savedQuotes: []
    }

    this.handleRandomize = this.handleRandomize.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    this.handleSaveQuote = this.handleSaveQuote.bind(this);
    this.handleFavoritesListItemClick = this.handleFavoritesListItemClick.bind(this);

    //user info methods
    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getUpdatedSavedQuotes = this.getUpdatedSavedQuotes.bind(this);
  }

  //QUOTE METHODS
  componentDidMount() {
    this.initializeApp();
    const isLoggedIn = TokenServices.getTokenByKey('motiv8-jwt');
    if(isLoggedIn) {
      const {
        sub: username,
        userId,
      } = jwt.decode(isLoggedIn);
      
      this.setState({
        isLoggedIn: true,
        username: username,
        userId: userId
      })
    }

  }

  initializeApp() {
    let getImages = this.getBackgroundImages(30);
    let getQuotes = this.getQuotes(30);
    
    Promise.all([ getQuotes, getImages ])
      .then(values => {
        console.log(values);
        this.fontPairItObj = IteratorServices.createIterator(this.state.fontPairings);
        this.handleRandomize();
      })
      .catch(err => console.log(err));
  }
  
  handleRandomize() {
    if(!this.state.keepBackground) {
      this.iterateBackgroundUrl(this.backgroundUrlItObj.next());
    }
    if(!this.state.keepFonts) {
      this.iterateFontPairing(this.fontPairItObj.next());
    }
    if(!this.state.keepQuote) {
      this.iterateQuote(this.quoteItObj.next());
    }
  }
  
  handleUndo() {
    if(!this.state.keepBackground) {
      this.setState((currentState) => {
        return {
          backgroundImageUrl: currentState.previousBackgroundImageUrl,
          previousBackgroundImageUrl: currentState.backgroundImageUrl
        }
      })
    }

    if(!this.state.keepFonts) {
      this.setState((currentState) => {
        return {
          fontPair: currentState.previousFontPair,
          previousFontPair: currentState.fontPair
        }
      })
    }

    if(!this.state.keepQuote) {
      this.setState((currentState) => {
        return {
          currentQuote: currentState.previousQuote,
          previousQuote: currentState.currentQuote
        }
      })
    }
  }

  handleSaveQuote(userId, getUpdatedSavedQuotes) {
    //TODO sends current quote config to favorites db table.

    if(userId === 0) {
      console.log('please log in');
      return;
    }

    const data = {
      backgroundImageUrl: this.state.backgroundImageUrl,
      quoteId: this.state.currentQuote.id,
      bodyFont: this.state.fontPair.body,
      authorFont: this.state.fontPair.author,
      userId: userId,
    }

    fetch('http://localhost:8000/api/savedQuotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      console.log(res.status);
      getUpdatedSavedQuotes(userId);
    })
  }

  handleCheckboxCheck(e) {
    switch(e.target.id) {
      case 'keep-quote-checkbox':
        this.setState((currentState) => {
          return {
            keepQuote: !currentState.keepQuote
          }
        });
        break;
      case 'keep-fonts-checkbox':
        this.setState((currentState) => {
          return {
            keepFonts: !currentState.keepFonts
          }
        });
        break;
      case 'keep-background-checkbox':
        this.setState((currentState) => {
          return {
            keepBackground: !currentState.keepBackground
          }
        })
        break;
      default:
        console.log('Something went wrong with the switch');
    }
  }

  handleFavoritesListItemClick(quote, history) {
    console.log('handleFavoritesListIemClick ran');
    console.log(quote);
    console.log('history', history);
    this.setState({
      currentQuote: quote,
      backgroundImageUrl: quote.backgroundimageurl,
      keepBackground: false,
      keepFonts: false,
      keepQuote: false
    }, () => {
      history.push('/quotes');
    })
  }
  //END QUOTE METHODS


  //USER METHODS

  determineIfUserLoggedIn() {

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
      let decodedToken = jwt.decode(res.authToken);
      console.log('userId', decodedToken);
      
      TokenServices.setToken('motiv8-jwt', res.authToken);
      this.setState({
        isLoggedIn: true,
        username: decodedToken.sub,
        userId: decodedToken.userId,
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
  //END USER METHODS
  
  //HELPER FUNCTIONS
  getBackgroundImages(numberOfImages = 30) {
    return fetch(`https://api.unsplash.com/photos/random?count=${numberOfImages}`, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`
      }
    })
    .then(res => res.json())
    .then(resJson => {
      return new Promise((resolve) => {
        this.setState({
          backgroundImageUrls: resJson,
        },
        //runs after setState
        () => {
          this.backgroundUrlItObj = IteratorServices.createIterator(this.state.backgroundImageUrls);
          resolve("backgroundUrlItObj Created");
        })
      })
    })
  }

  getQuotes(numberOfQuotes = 30) {
    //TODO make quotes route dynamic to accept numberOfQuotes param
    return fetch('http://localhost:8000/api/quotes')
    .then(quotes => quotes.json())
    .then(quotes => {
      return new Promise((resolve) => {
        this.setState({
          quotes: quotes
        },
        //runs after setState
        () => {
          this.quoteItObj = IteratorServices.createIterator(this.state.quotes);
          resolve("quoteItObj Created");
        })
      });
    });
  }
  
  iterateBackgroundUrl({value, done}) {
    if(!done) {
      this.setState((currentState) => {
        return {
          backgroundImageUrl: value.urls.regular,
          previousBackgroundImageUrl: currentState.backgroundImageUrl
        }
      })
    }
    //create new iterator when old one runs out
    else {
      this.getBackgroundImages(30)
    }
  }
  
  iterateFontPairing({value, done}) {
    if(!done) {
      this.setState((currentState) => {
        return {
          fontPair: value,
          previousFontPair: currentState.fontPair 
        }
      })
    }
    else {
      //if iterator done create new iterator then call the first value on it.
      this.fontPairItObj = IteratorServices.createIterator(this.state.fontPairings);
      this.iterateFontPairing(this.fontPairItObj.next());
    }
  }
  
  iterateQuote({value, done}) {
    if(!done) {
      this.setState(currentState => {
        return {
          currentQuote: value,
          previousQuote: currentState.currentQuote
        }
      })
    }
    else {
      this.getQuotes(30);
    }
  }
  //END HELPER FUNCTIONS


  render() {

    const globalContext = {
      state: this.state,
      methods: {
        handleCheckboxCheck: this.handleCheckboxCheck,
        handleRandomize: this.handleRandomize,
        handleUndo: this.handleUndo,
        handleSaveQuote: this.handleSaveQuote,
        handleFavoritesListItemClick: this.handleFavoritesListItemClick,
        handleCreateAccountSubmit: this.handleCreateAccountSubmit,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
        getUpdatedSavedQuotes: this.getUpdatedSavedQuotes
      }
    }

        
    return (
      <GlobalContext.Provider value={globalContext}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
export { GlobalContext , GlobalContextManager };
