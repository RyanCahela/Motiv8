import React from 'react'

export default function QuoteControls(props) {
  return (
    <div className="btn-group">
      <label for="keep-quote-checkbox">Keep Quote</label>
      <input
        onChange={(e) => props.handleCheckboxCheck(e)}
        type="checkbox" 
        id="keep-quote-checkbox" />
      <label for="keep-fonts-checkbox">Keep Fonts</label>
      <input
        onChange={(e) => props.handleCheckboxCheck(e)}
        type="checkbox" 
        id="keep-fonts-checkbox" />
      <label for="keep-background-checkbox">Keep Background</label>
      <input
        onChange={(e) => props.handleCheckboxCheck(e)}
        type="checkbox" 
        id="keep-background-checkbox" />
    </div>
  )
}
