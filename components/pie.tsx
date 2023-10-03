"use client";

import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PieData = {
  name: string;
  value: number;
}[];

type ResponsePieProps = {
  data: PieData;
};

const COLORS = [
  "#FF6B6B",
  "#FFD166",
  "#06D6A0",
  "#118AB2",
  "#8338EC",
  "#FFC3A0",
  "#3A86FF",
  "#6A0572",
  "#52B788",
  "#F25F5C",
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabell = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  // Adjust this threshold as needed
  const MIN_PERCENT_FOR_LABEL = 0.11; // 5%

  if (percent < MIN_PERCENT_FOR_LABEL) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Adjusted from 0.5 to 0.7
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  // Adjust this threshold as needed
  const MIN_PERCENT_FOR_LABEL = 0.2; // 5%

  if (percent < MIN_PERCENT_FOR_LABEL) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderLegend = (props) => {
  const { payload } = props;
  const totalValue = payload.reduce(
    (acc, entry) => acc + (Number.isFinite(entry.value) ? entry.value : 0),
    0
  );

  return (
    <ul>
      {payload.map((entry, index) => {
        const percentage =
          totalValue !== 0 ? ((entry.value / totalValue) * 100).toFixed(2) : 0;
        return (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name} ({percentage}%)
          </li>
        );
      })}
    </ul>
  );
};
const ResponsePie = ({ data }: ResponsePieProps) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <ResponsiveContainer width="50%" height={200}>
      <PieChart width={400} height={200}>
        <Pie
          data={data}
          cx="20%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          height={24}
          verticalAlign="top"
          layout="vertical"
          wrapperStyle={{
            paddingRight: "0px",
            paddingLeft: "0px",
            fontSize: "12px",
          }}
          // content={renderLegend}
          // align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ResponsePie;
