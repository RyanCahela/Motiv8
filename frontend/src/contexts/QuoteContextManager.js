import React from 'react';
import fontPairings from '../fonts/fontPairings';
import IteratorServices from '../services/IteratorServices';
import { thisTypeAnnotation } from '@babel/types';

const QuoteContext = React.createContext();

class QuoteContextManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    }

    this.handleRandomize = this.handleRandomize.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    this.handleSaveQuote = this.handleSaveQuote.bind(this);
    this.handleFavoritesListItemClick = this.handleFavoritesListItemClick.bind(this);
  }


  componentDidMount() {
    this.getBackgroundImages(30)
    this.getQuotes(30)
    this.fontPairItObj = IteratorServices.createIterator(this.state.fontPairings);
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
      backgroundImageUrl: quote.backgroundimageurl
    }, () => {
      history.push('/quotes');
    })
  }
  
  //HELPER FUNCTIONS
  getBackgroundImages(numberOfImages = 30) {
    fetch(`https://api.unsplash.com/photos/random?count=${numberOfImages}`, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`
      }
    })
    .then(res => res.json())
    .then(resJson => {
      this.setState({
        backgroundImageUrls: resJson,
      },
      //runs after setState
      () => {
        this.backgroundUrlItObj = IteratorServices.createIterator(this.state.backgroundImageUrls)
        this.handleRandomize();
      })
    });
  }

  getQuotes(numberOfQuotes = 30) {
    //TODO make quotes route dynamic to accept numberOfQuotes param
    fetch('http://localhost:8000/api/quotes')
    .then(quotes => quotes.json())
    .then(quotes => {
      this.setState({
        quotes: quotes
      },
      //runs after setState
      () => {
        this.quoteItObj = IteratorServices.createIterator(this.state.quotes);
      }
      )
    })
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

  render() {

    const quoteContext = {
      state: this.state,
      methods: {
        handleCheckboxCheck: this.handleCheckboxCheck,
        handleRandomize: this.handleRandomize,
        handleUndo: this.handleUndo,
        handleSaveQuote: this.handleSaveQuote,
        handleFavoritesListItemClick: this.handleFavoritesListItemClick
      }
    }

        
    return (
      <QuoteContext.Provider value={quoteContext}>
        {this.props.children}
      </QuoteContext.Provider>
    );
  }
}
export { QuoteContext , QuoteContextManager };
