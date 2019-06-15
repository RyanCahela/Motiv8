import React from 'react';
import Menu from '../components/Menu';
import Nav from '../components/QuoteNav';
import Quote from '../components/Quote';
import QuoteDisplay from '../components/QuoteDisplay';
import QuoteControls from '../components/QuoteControls';
import fontPairings from '../fonts/fontPairings';
import quotes from '../quotes/quotes';
import IteratorServices from '../services/IteratorServices';
import Router from '../router/Router';

const QuoteContext = React.createContext();

class QuoteContextManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quotes: [...quotes],
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
  }


  componentDidMount() {
    this.getBackgroundImages(30);
    this.fontPairItObj = IteratorServices.createIterator(this.state.fontPairings);
    this.quoteItObj = IteratorServices.createIterator(this.state.quotes);
  }
  
  handleRandomize() {
    if(!this.state.keepBackground) {
      this.setBackgroundUrl(this.backgroundUrlItObj.next());
    }
    if(!this.state.keepFonts) {
      this.setFontPairing(this.fontPairItObj.next());
    }
    if(!this.state.keepQuote) {
      this.setQuote(this.quoteItObj.next());
    }
  }
  
  handleUndo() {
    this.setState((currentState) => {
      return {
        backgroundImageUrl: currentState.previousBackgroundImageUrl,
        fontPair: currentState.previousFontPair,
        currentQuote: currentState.previousQuote
      }
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
  
  //HELPER FUNCTIONS
  getBackgroundImages(numberOfImages) {
    if(numberOfImages > 30) {
      numberOfImages = 30;
    }
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
  
  setBackgroundUrl({value, done}) {
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
  
  setFontPairing({value, done}) {
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
      this.setFontPairing(this.fontPairItObj.next());
    }
  }
  
  setQuote({value, done}) {
    if(!done) {
      this.setState(currentState => {
        return {
          currentQuote: value,
          previousQuote: currentState.currentQuote
        }
      })
    }
    else {
      this.quoteItObj = IteratorServices.createIterator(this.state.quotes);
      this.setQuote(this.quoteItObj.next());
    }
  }

  render() {
    //create components to pass down
    const quoteDisplay = (
      <QuoteDisplay 
      backgroundImageUrl={this.state.backgroundImageUrl} 
      fontPair={this.state.fontPair}
      quote={this.state.currentQuote}/>
    )
    const quoteControls = (
      <QuoteControls 
        handleCheckboxCheck={this.handleCheckboxCheck}/>
    )

    const quoteContext = {
      state: this.state,
      methods: {
        handleCheckboxCheck: this.handleCheckboxCheck,
        handleRandomize: this.handleRandomize,
        handleUndo: this.handleUndo,
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
