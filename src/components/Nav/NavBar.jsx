import Button from '../Utils/Button';
import { Link } from 'react-router-dom';
import { getLoginData } from '../LoginDataProvider';

function NavBar() {
    const loginData = getLoginData();
    if (!loginData) {
        console.log('Null');
    }

    return (
        <div className='nav'>
            <div className='brand'>VoSys</div>
            <div className='links'>
                <Link to='/contact'>Contact Us</Link>
                <Link to='/about'>About Us</Link>
                {!loginData ? (
                    <>
                        <Link to='/login'>
                            <Button text='Login'></Button>
                        </Link>
                        <Link to='/register'>
                            <Button text='Register'></Button>
                        </Link>
                    </>
                ) : (
                    <Link to='/dashboard'>
                        <Button text={loginData.username}></Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default NavBar;
