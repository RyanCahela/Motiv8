import React from 'react'
import QuoteDisplay from '../components/QuoteDisplay';
import QuoteControls from '../components/QuoteControls';
import QuoteNav from '../components/QuoteNav';
import { QuoteContext } from '../contexts/QuoteContextManager'

export default function QuoteEditorPage() {
  return (
    <>
      <QuoteControls />
      <QuoteDisplay />
      <QuoteNav />
    </>
  )
}
