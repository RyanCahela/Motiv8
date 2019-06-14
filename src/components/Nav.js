import React from 'react'

export default function Nav(props) {
  return (
    <div>
      <button onClick={() => props.handleUndo()}>Undo</button>
      <button onClick={() => props.handleRandomize()}>Randomize</button>
    </div>
  )
}
