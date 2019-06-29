import React from 'react'
import QuoteDisplay from '../components/QuoteEditorPage/QuoteDisplay';
import QuoteControls from '../components/QuoteEditorPage/QuoteControls';
import QuoteNav from '../components/QuoteEditorPage/QuoteNav';

export default function QuoteEditorPage() {
  return (
    <div className="container">
      <QuoteControls />
      <QuoteDisplay />
      <QuoteNav />
    </div>
  )
}
