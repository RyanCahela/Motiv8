import React from 'react'
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';

export default function AccountAccessForms() {
  return (
    <>
      <LoginForm />
      <h3>OR</h3>
      <CreateAccountForm />
    </>
  )
}
