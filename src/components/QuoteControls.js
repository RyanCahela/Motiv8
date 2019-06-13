import React from 'react'

export default function QuoteControls() {
  return (
    <div className="btn-group">
      <label for="keep-quote-checkbox">Keep Quote</label>
      <input type="checkbox" id="keep-quote-checkbox" />
      <label for="keep-fonts-checkbox">Keep Fonts</label>
      <input type="checkbox" id="keep-fonts-checkbox" />
      <label for="keep-background-checkbox">Keep Background</label>
      <input type="checkbox" id="keep-background-checkbox" />
    </div>
  )
}
