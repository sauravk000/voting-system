import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getLoadFunc } from './LoadingProvider';
import axios from 'axios';
import Button from './Utils/Button';
import { getLoginData } from './LoginDataProvider';
import { getWebThreeData } from './WebThreeProvider';
import { setAlert } from './AlertProvider';

function DisplayVotes(props) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const loginData = getLoginData();
  const { token } = getLoginData();
  const [data, setData] = useState({ data: [], count: 0 });
  const [tCidV, settcidV] = useState('');
  const { getVoteAndName } = getWebThreeData();
  const setAlertInfo = setAlert();
  async function loadData() {
    let dt = [];
    let count = 0;
    let resp = await axios.get(
      'https://voting-system-backend.onrender.com/team/getTeam/' + tCidV,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const candidates = resp.data.candidates;
    candidates.forEach(async (item) => {
      setLoading(true);
      try {
        const info = await getVoteAndName(tCidV, item);
        dt.push(info);
        count += info.votes;
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setAlertInfo({
          title: 'Error',
          description: 'Some error occured.',
          type: 'error',
          enabled: true,
        });
        console.timeLog(err);
      }
    });
    setData({ data: dt, count: data.count });
  }
  const cBtnHandler = async function (e) {
    try {
      setLoading(true);
      loadData();
      settcidV('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const setLoading = getLoadFunc();

  return (
    <div className='votesDisplay'>
      <div className='voteViewPanel'>
        <input
          className='wInput'
          type='text'
          value={tCidV}
          placeholder='Enter the Team ID'
          onChange={(e) => {
            settcidV(e.target.value);
          }}
        ></input>
        <Button text='Check Votes' onClick={cBtnHandler} />
      </div>
      <div className='voteChart'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey='votes'
            isAnimationActive={false}
            data={data.data}
            cx={200}
            cy={200}
            outerRadius={150}
            fill='yellow'
            label
          >
            {data.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default DisplayVotes;
