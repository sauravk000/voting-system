import React from 'react';
import NavBar from './Nav/NavBar';
import VotingImg from "../assets/Voting-amico.svg";

function Home () {
    return (
      <div>
        <NavBar />
        <div className="content">
          <div className='homeImage'>
            <img src={VotingImg} alt="Voting Image" />
          </div>
        </div>
      </div>
    );
}

export default Home;