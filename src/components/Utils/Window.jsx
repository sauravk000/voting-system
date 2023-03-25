import { Link } from 'react-router-dom';
import Button from './Button';

function Window(props) {
  const { title, desc, buttonTitle, buttonHandler, link } = props;
  return (
    <div className='window'>
      <div className='wTitle'>{title}</div>
      <p className='wDesc'>{desc}</p>
      <Link to={link}>
        <Button text={buttonTitle} onClick={buttonHandler}></Button>
      </Link>
    </div>
  );
}

export default Window;
