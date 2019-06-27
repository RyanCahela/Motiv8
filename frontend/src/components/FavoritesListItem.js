import React from 'react'

export default function FavoritesListItem({ quote }) {
  return (
    <li>
      <p>{quote.quote}</p>
      <p>{quote.author}</p>
    </li>
  )
}
