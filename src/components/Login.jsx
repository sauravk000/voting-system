import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getLoginData, updateLoginData } from './LoginDataProvider';
import Button from '../components/Utils/Button';
import axios from 'axios';
import { setAlert } from './AlertProvider';
import { getLoadFunc } from './LoadingProvider';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const setAlertInfo = setAlert();
  const LoginData = getLoginData();
  const getData = updateLoginData();
  const setLoading = getLoadFunc();
  if (LoginData) {
    return <Navigate to='/dashboard' />;
  }

  function setData(e) {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }
  async function handleForm(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let resp = await axios.post(
        'https://excited-fatigues-colt.cyclic.app/user/login',
        loginInfo
      );
      let ob = {
        ...resp.data,
        username: loginInfo.username,
        isCandidate: resp.data.isCandidate,
      };
      setLoginInfo({
        username: '',
        password: '',
      });
      localStorage.setItem('auth', JSON.stringify(ob));
      await getData();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response && err.response.status == 401) {
        setAlertInfo({
          title: 'Warning!',
          description: 'Invalid Username/Password',
          enabled: true,
          type: 'warning',
        });
        return;
      }
    } finally {
      setLoginInfo({ username: '', password: '' });
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
