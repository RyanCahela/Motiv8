import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Quote from './components/Quote';
import QuoteCanvas from './components/QuoteCanvas';
import QuoteControls from './components/QuoteControls';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quotes: [{
        body: 'test quote',
        author: 'Ryan Cahela'
      }],
      backgroundImageUrl: '',
      fontFamily: 'Arial, Helvetica, sans-serif'
    }

    this.quoteCanvas = (
      <QuoteCanvas 
      backgroundImageUrl={this.state.backgroundImageUrl} 
      fontFamily={this.state.fontFamily}
      quote={this.state.quotes[0]}/>
    )

    this.quoteControls = (
      <QuoteControls/>
    )
  }

  componentDidMount() {
    fetch('https://api.unsplash.com/photos/random', {
      headers: {
        Authorization: 'Client-ID 637ad8107185907a6e559449be25e4c6fb9429f66f500149003592bbf8bf49ce'
      }
    })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      this.setState({
        backgroundImageUrl: resJson.urls.small
      })
    });
  }

  render() {
    const quoteCanvas = (
      <QuoteCanvas 
      backgroundImageUrl={this.state.backgroundImageUrl} 
      fontFamily={this.state.fontFamily}
      quote={this.state.quotes[0]}/>
    )

    const quoteControls = (
      <QuoteControls/>
    )

    return (
        <>
        <Menu />
        <Quote quoteCanvas={quoteCanvas} quoteControls={quoteControls}/>
        <Nav />
        </>
    );
  }
}

export default App;
