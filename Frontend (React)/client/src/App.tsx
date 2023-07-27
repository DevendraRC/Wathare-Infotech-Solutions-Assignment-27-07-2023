// client/src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: 'Your Data',
        data: data.map((item) => item.value),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div className="App">
      <h1>Your Chart Application</h1>
      <Line data={chartData} />
    </div>
  );
};

export default App;
