// src/components/Chart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => {
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Format data for the chart
  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: 'Your Data',
        data: data.map((item) => item.value),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
