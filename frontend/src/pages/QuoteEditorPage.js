import React from 'react'
import QuoteDisplay from '../components/QuoteDisplay';
import QuoteControls from '../components/QuoteControls';
import QuoteNav from '../components/QuoteNav';

export default function QuoteEditorPage() {
  return (
    <>
      <QuoteControls />
      <QuoteDisplay />
      <QuoteNav />
    </>
  )
}
