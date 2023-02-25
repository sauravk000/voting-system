import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getLoginData, updateLoginData } from './LoginDataProvider';
import Button from '../components/Utils/Button';
import axios from 'axios';

function Register() {
  const [regInfo, setregInfo] = useState({
    name: '',
    username: '',
    canditateType: 'Candidate',
    password: '',
    confirmPassword: ''
  });
  const LoginData = getLoginData();
  const getData = updateLoginData();
  if (LoginData) {
    return <Navigate to='/dashboard' />;
  }

  function setData(e) {
    setregInfo({ ...regInfo, [e.target.name]: e.target.value });
  }
  async function handleForm(e) {
    e.preventDefault();
    try {
      let resp = await axios.post(
        'http://localhost:5120/user/login',
        regInfo
      );
      let ob = { ...resp.data, username: regInfo.username };
      localStorage.setItem('auth', JSON.stringify(ob));
      await getData();
    } catch (err) {
      if (err.response && err.response.status == 401) {
        alert('Invalid Username/Password');
        return;
      }
      console.log(err);
    }
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
              <label htmlFor='name'>Full Name</label>
              <input
                type='text'
                name='name'
                required
                value={regInfo.name}
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
                value={regInfo.name}
                onChange={(e) => {
                  setData(e);
                }}
              />
            </div>
            <div className='inputGroup'>
              <label htmlFor='accountType'>Account Type</label>
              <select name="accountType" id="accountType">
                <option value="Candidate">Candidate</option>
                <option value="Voter">Voter</option>
              </select>
              <input
                type='text'
                name='name'
                required
                value={regInfo.name}
                onChange={(e) => {
                  setData(e);
                }}
              />
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
