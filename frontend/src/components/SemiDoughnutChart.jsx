
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Category A', value: 200 },
  { name: 'Category B', value: 300 },
];

const COLORS = ['#7c3aed', '#f5f3ff'];

const SemiDoughnutChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          innerRadius={70}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={2}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip labelStyle={{ color: 'red' }} formatter={(value) => `$${value}`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SemiDoughnutChart;
