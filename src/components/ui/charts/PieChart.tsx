import { Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: any[];
  nameKey: string;
  valueKey: string;
  height?: number;
}

export function PieChart({ data, nameKey, valueKey, height = 300 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          nameKey={nameKey}
          dataKey={valueKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="hsl(var(--primary))"
          label
        />
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}