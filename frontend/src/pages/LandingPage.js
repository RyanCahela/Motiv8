import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <h1>Welcome to Motiv8</h1>  
        <main>
          <h2>Customize your inspiration</h2>
          <p>Instruction blah blah blah 
            Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim 
            veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa 
            qui officia deserunt mollit anim id est laborum."
          </p>
          <Link to={'/quotes'}>
            <button className="landing-button">Get Started!</button>
          </Link>
        </main>
    </div>
  )
}