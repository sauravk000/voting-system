import { PuffLoader } from 'react-spinners';

function LoadingScreen(props) {
  const { isLoading } = props;
  let hiddenClass = '';
  if (!isLoading) hiddenClass = 'hidden';
  return (
    <div className={`loadingScreen ${hiddenClass}`}>
      <div className='rect'>
        <PuffLoader color='yellow'></PuffLoader>
      </div>
    </div>
  );
}

export default LoadingScreen;
