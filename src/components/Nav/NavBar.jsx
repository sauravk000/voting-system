import React from 'react'
import Button from '../Utils/Button'
import { Link } from 'react-router-dom';

function NavBar () {
    return (
      <div className='nav'>
        <div className='brand'>VoSys</div>
        <div className='links'>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">
            <Button text="Login"></Button>
          </Link>
          <Link to="/register">
            <Button text="Register"></Button>
          </Link>
        </div>
      </div>
    );
}

export default NavBar