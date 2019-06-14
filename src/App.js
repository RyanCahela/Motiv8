import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Quote from './components/Quote';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteControls from './components/QuoteControls';
import fontPairings from './fonts/fontPairings';
import quotes from './quotes/quotes';

class App extends React.Component {

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
  }

  componentDidMount() {
    this.getBackgroundImages(30);
    this.createFontPairIterator();
    this.createQuoteIterator();
  }

  //creates a bg image iterator
  getBackgroundImages(numberOfImages) {
    if(numberOfImages > 30) {
      numberOfImages = 30;
    }
    fetch(`https://api.unsplash.com/photos/random?count=${numberOfImages}`, {
      headers: {
        Authorization: 'Client-ID 637ad8107185907a6e559449be25e4c6fb9429f66f500149003592bbf8bf49ce'
      }
    })
    .then(res => res.json())
    .then(resJson => {
      this.setState({
        backgroundImageUrls: resJson,
      },
      //runs after setState
      () => {
        this.backgroundUrlItObj = this.createIteratorObj(this.state.backgroundImageUrls);
        this.handleRandomize();
      })
    });
  }

  //create a fontPair Iterator
  createFontPairIterator() {
    this.fontPairItObj = this.createIteratorObj(this.state.fontPairings);
  }

  createQuoteIterator() {
    this.quoteItObj = this.createIteratorObj(this.state.quotes);
  }

  *createIteratorObj(arr) {
    for(let obj of arr) {
      yield obj;
    }
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
    if(value) {
      console.log(value);
      this.setState((currentState) => {
        return {
          fontPair: value,
          previousFontPair: currentState.fontPair 
        }
      })
    }
    else {
      //if iterator done create new iterator then call the first value on it.
      this.createFontPairIterator();
      this.setFontPairing(this.fontPairItObj.next());
    }
  }

  setQuote({value, done}) {
    console.log(value);
    if(value) {
      this.setState(currentState => {
        return {
          currentQuote: value,
          previousQuote: currentState.currentQuote
        }
      })
    }
    else {
      this.createQuoteIterator();
      this.setQuote(this.quoteItObj.next());
    }
  }

  handleRandomize() {
    this.setBackgroundUrl(this.backgroundUrlItObj.next());
    this.setFontPairing(this.fontPairItObj.next());
    this.setQuote(this.quoteItObj.next());
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

  render() {
    //create components to pass down
    const quoteDisplay = (
      <QuoteDisplay 
      backgroundImageUrl={this.state.backgroundImageUrl} 
      fontPair={this.state.fontPair}
      quote={this.state.currentQuote}/>
    )
    const quoteControls = (
      <QuoteControls />
    )

    return (
        <>
        <Menu />
        <Quote quoteDisplay={quoteDisplay} quoteControls={quoteControls}/>
        <Nav handleRandomize={this.handleRandomize} handleUndo={this.handleUndo}/>
        </>
    );
  }
}

export default App;
