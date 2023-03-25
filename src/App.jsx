import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddressDataProvider from './components/AddressDataProvider';
import Dashboard from './components/Dashboard';
import Base from './components/dashboard/Base';
import Home from './components/Home';
import HostView from './components/HostView';
import Login from './components/Login';
import LoginDataProvider from './components/LoginDataProvider';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Vote from './components/Vote';

function App() {
  return (
    <LoginDataProvider>
      <AddressDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='dashboard' element={<Dashboard />}>
              <Route index element={<Base />}></Route>
              <Route path='vote' element={<Vote />}></Route>
              <Route path='hostView' element={<HostView />}></Route>
            </Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </AddressDataProvider>
    </LoginDataProvider>
  );
}

export default App;
