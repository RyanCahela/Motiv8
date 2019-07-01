import React from 'react'
import { GlobalContext } from '../../contexts/GlobalContextManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

export default function QuoteControls() {

    return (
      <GlobalContext.Consumer>
        {({ methods, state }) => {



          const { 
            keepBackground,
            keepFonts,
            keepQuote,
          }  = state

          const iconSize = 'lg';
          
          return (
            <div className="quote-controls-container">
              <h5 className="quote-controls-heading">Randomize Options</h5>
              <div className="quote-controls">
                <input
                  onChange={(e) => methods.handleCheckboxCheck(e)}
                  type="checkbox"
                  id="keep-quote-checkbox" />
                <label className="quote-controls__label" htmlFor="keep-quote-checkbox">
                  <div>
                    {keepQuote ? 
                      <FontAwesomeIcon icon={faCheckSquare} size={iconSize}/> 
                      : 
                      <FontAwesomeIcon icon={faSquare} size={iconSize}/>}
                  </div>
                  <span>Keep Quote</span>
                </label>
                <input
                  onChange={(e) => methods.handleCheckboxCheck(e)}
                  type="checkbox"
                  id="keep-fonts-checkbox" />
                <label className="quote-controls__label" htmlFor="keep-fonts-checkbox">
                  <div>
                    {keepFonts? 
                      <FontAwesomeIcon icon={faCheckSquare} size={iconSize}/>
                      : 
                      <FontAwesomeIcon icon={faSquare} size={iconSize}/>}
                  </div>
                  <span>Keep Fonts</span>
                </label>
                <input
                  onChange={(e) => methods.handleCheckboxCheck(e)}
                  type="checkbox"
                  id="keep-background-checkbox" />
                <label className="quote-controls__label" htmlFor="keep-background-checkbox">
                  <div>
                    {keepBackground? 
                      <FontAwesomeIcon icon={faCheckSquare} size={iconSize}/> 
                      : 
                      <FontAwesomeIcon icon={faSquare} size={iconSize}/>}
                  </div>
                  <span>Keep Background</span>
                </label>
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    )
  
}
