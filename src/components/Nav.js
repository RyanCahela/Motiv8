import React from 'react'

export default function Nav(props) {
  return (
    <div>
      <button>Undo</button>
      <button onClick={() => props.getQuoteAssets()}>Randomize</button>
    </div>
  )
}
