import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProductionPoint = {
  timestamp: string;
  goodParts: number;
  badParts: number;
};

type ProductionChartProps = {
  data: ProductionPoint[];
};

function ProductionChart({
  data,
}: ProductionChartProps) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Production Trend
        </h2>

        <p className="text-sm text-gray-500">
          Good vs Bad parts over time
        </p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="goodParts"
              name="Good Parts"
              stroke="currentColor"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="badParts"
              name="Bad Parts"
              stroke="currentColor"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ProductionChart;