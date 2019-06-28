import React from 'react'
import QuoteDisplay from '../components/QuoteDisplay';
import QuoteControls from '../components/QuoteControls';
import QuoteNav from '../components/QuoteNav';
import '../css/quoteEditorPage.css';

export default function QuoteEditorPage() {
  return (
    <div className="container">
      <QuoteControls />
      <QuoteDisplay />
      <QuoteNav />
    </div>
  )
}
