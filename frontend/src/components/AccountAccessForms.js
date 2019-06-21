import React from 'react'
import LoginForm from '../components/LoginForm';
import CreateAccountForm from '../components/CreateAccountForm';

export default function AccountAccessForms() {
  return (
    <>
      <LoginForm />
      <h3>OR</h3>
      <CreateAccountForm />
    </>
  )
}
