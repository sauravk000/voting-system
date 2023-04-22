import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getLoginData, updateLoginData } from './LoginDataProvider';
import Button from '../components/Utils/Button';
import axios from 'axios';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const LoginData = getLoginData();
  const getData = updateLoginData();
  if (LoginData) {
    return <Navigate to='/dashboard' />;
  }

  function setData(e) {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }
  async function handleForm(e) {
    e.preventDefault();
    try {
      let resp = await axios.post(
        'http://localhost:5120/user/login',
        loginInfo
      );
      let ob = {
        ...resp.data,
        username: loginInfo.username,
        isCandidate: resp.data.isCandidate,
      };
      localStorage.setItem('auth', JSON.stringify(ob));
      await getData();
    } catch (err) {
      if (err.response && err.response.status == 401) {
        alert('Invalid Username/Password');
        return;
      }
    }
  }
  return (
    <div className='login'>
      <div className='firstHalf'>
        <div className='brand'>
          <Link to='/'>VoSys</Link>
        </div>
      </div>
      <div className='otherHalf'>
        <div>
          <h1>Welcome Back!</h1>
          <form>
            <div className='inputGroup'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                value={loginInfo.username}
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
                value={loginInfo.password}
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

export default Login;
