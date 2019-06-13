import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Quote from './components/Quote';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteControls from './components/QuoteControls';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quotes: [{
        body: 'Always focus on how far you\'ve come, not how far you have to go.',
        author: 'Anonymous'
      }],
      backgroundImageUrl: '',
      fontFamily: 'Arial, Helvetica, sans-serif'
    }

    this.quoteDisplay = (
      <QuoteDisplay 
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
    const quoteDisplay = (
      <QuoteDisplay 
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
        <Quote quoteDisplay={quoteDisplay} quoteControls={quoteControls}/>
        <Nav />
        </>
    );
  }
}

export default App;
