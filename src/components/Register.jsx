import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getLoginData } from './LoginDataProvider';
import Button from '../components/Utils/Button';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [regInfo, setregInfo] = useState({
    username: '',
    email: '',
    canditateType: 'Candidate',
    password: '',
    confirmPassword: '',
  });
  const LoginData = getLoginData();
  if (LoginData) {
    return <Navigate to='/dashboard' />;
  }

  function setData(e) {
    setregInfo({ ...regInfo, [e.target.name]: e.target.value });
  }
  async function handleForm(e) {
    e.preventDefault();
    let ob = {
      username: regInfo.username,
      isCandidate: regInfo.canditateType == 'Candidate',
      password: regInfo.password,
      email: regInfo.email,
    };
    try {
      let resp = await axios.post('http://localhost:5120/user/register', ob);
      if (resp.data.success) {
        console.log('Successfuly made');
        navigate('/login');
      }
    } catch (err) {}
  }
  return (
    <div className='register'>
      <div className='firstHalf'>
        <div className='brand'>
          <Link to='/'>VoSys</Link>
        </div>
      </div>
      <div className='otherHalf'>
        <div>
          <h1>Let's setup your account!</h1>
          <form>
            <div className='inputGroup'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                required
                value={regInfo.username}
                onChange={(e) => {
                  setData(e);
                }}
              />
            </div>
            <div className='inputGroup'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                required
                value={regInfo.email}
                onChange={(e) => {
                  setData(e);
                }}
              />
            </div>
            <div className='inputGroup'>
              <label htmlFor='accountType'>Account Type</label>
              <select
                name='accountType'
                id='accountType'
                onChange={(e) => {
                  setData(e);
                }}
              >
                <option value='Candidate'>Candidate</option>
                <option value='Voter'>Voter</option>
              </select>
            </div>
            <div className='inputGroup'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                required
                value={regInfo.password}
                onChange={(e) => {
                  setData(e);
                }}
              />
            </div>
            <Link to='#'>Forgot Password?</Link>
            <Button text='Submit' onClick={handleForm} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
