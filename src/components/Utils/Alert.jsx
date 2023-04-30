import { useState } from 'react';
import Button from './Button';
import { setAlert } from '../AlertProvider';

function Alert(props) {
  const { title, description, type, enabled } = props;
  const setAlertInfo = setAlert();

  async function onclickHandler(e) {
    await setAlertInfo({
      title,
      description,
      type,
      enabled: false,
    });
  }
  return (
    <div className={`modal ${enabled ? '' : 'hidden'}`}>
      <div className={`alert ${type}`}>
        <div className='alertTitle'>{title}</div>
        <div className='alertDesc'>{description}</div>
        <Button text='OK' onClick={onclickHandler} />
      </div>
    </div>
  );
}

export default Alert;
