import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { day: 'Mon', spent: 5000 },
  { day: 'Tue', spent: 8000 },
  { day: 'Wed', spent: 10000 },
  { day: 'Thur', spent: 7000 },
  { day: 'Fri', spent: 6000 },
  { day: 'Sat', spent: 9000 },
  { day: 'Sun', spent: 7500 },
];

const MotoristBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="day" />
        <YAxis dataKey="spent" />
        <Tooltip />
        <Legend />
        <Bar dataKey="spent" fill="#7c3aed" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MotoristBarChart;
