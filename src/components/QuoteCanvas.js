import React from 'react'

export default class QuoteCanvas extends React.Component {

  constructor(props) {
    super(props);

    function setupCanvas(canvas) {
      // Get the device pixel ratio, falling back to 1.
      var dpr = window.devicePixelRatio || 1;
      // Get the size of the canvas in CSS pixels.
      var rect = canvas.getBoundingClientRect();
      // Give the canvas pixel dimensions of their CSS
      // size * the device pixel ratio.
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      var ctx = canvas.getContext('2d');
      // Scale all drawing operations by the dpr, so you
      // don't have to worry about the difference.
      ctx.scale(dpr, dpr);
      return ctx;
    }
  }

  componentDidMount() {
    const ctx = this.setupCanvas(this.refs.canvas);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7';
    
    //create backdrop params
    let backdropSideMargin = 0.1 * this.refs.canvas.width; //0.1 = 10% margin
    let backdropVertMargin = 0.25 * this.refs.canvas.height //0.25 = 25% of height
    let backdropHeight = this.refs.canvas.height / 2; //2 = half the height of canvas, 
    let backdropWidth = 
      this.refs.canvas.width - backdropSideMargin * 2 // 2 is to account for both left and right margin.
    //draw backdrop
    ctx.fillRect(
      backdropSideMargin, //x coordinate to start drawing
      backdropVertMargin, //y coordinate to start drawing
      backdropWidth,
      backdropHeight);
    
    

    //draw quote body
    ctx.fillStyle = 'white';
    ctx.font = '50px serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${this.props.quote.body}`,
      this.refs.canvas.width / 2,
      this.refs.canvas.height / 2);
  }

  setupCanvas(canvas) {
    //For High Res Displays
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
  }

  render() {
    console.log(this.props);
    const backgroundStyles = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `url(${this.props.backgroundImageUrl})`,
      width: '100%',
    }
    return (
      <canvas ref="canvas" style={backgroundStyles}></canvas>
    )
  }
}
