import { Link } from 'react-router-dom';
import NavBar from './Nav/NavBar';
import VotingImg from '../assets/Voting-amico.svg';
import Button from './Utils/Button';

function Home() {
    return (
        <div>
            <NavBar />
            <div className="content">
                <div className="homeImage">
                    <img src={VotingImg} alt="Voting Image" />
                </div>
                <div>
                    <div className="title">
                        The Best <br /> Voting System
                    </div>
                    <p>
                        Voting System based on blockchain to suit the needs for
                        a better election.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla finibus iaculis lobortis. Cras mattis ac ante eu
                        fermentum. Nunc hendrerit ornare lacus, non gravida erat
                        porta at. Integer molestie sem sit amet maximus varius.
                        Duis ut pulvinar massa. Etiam aliquam elit diam, eu
                        elementum leo eleifend nec. Praesent vel posuere.
                    </p>
                    <Link to="/login">
                        <Button text="Vote"></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
