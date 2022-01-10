import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";

export default function ({ data }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let temp = [];

    if (data.length > 1) {
      data.forEach((item) => {
        temp.push({
          city: item.city.split("").slice(0, 4).join("").toUpperCase(),
          aqi: item.aqi,
        });
      });
    } else {
      data.forEach((item) => {
        temp.push({
          city: item.city.toUpperCase(),
          aqi: item.aqi,
        });
      });
    }

    setChartData([...temp]);
  }, [data]);

  const getPath = (x, y, width, height) =>
    `M${x},${y + height}
     C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
      x + width / 2
    }, ${y}
     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
     Z`;

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const CustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  const renderCustomBarLabel = ({ x, y, width, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      >{`${value.toFixed(2)}`}</text>
    );
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <BarChart
        width={900}
        height={400}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        {chartData.length > 1 ? (
          <>
            <Tooltip content={<CustomTooltip />} />
            <Bar
              barSize={30}
              dataKey="aqi"
              fill="#8884d8"
              label={renderCustomBarLabel}
            />
          </>
        ) : (
          <Bar
            dataKey="aqi"
            barSize={500}
            fill="#413ea0"
            shape={<TriangleBar />}
            label={renderCustomBarLabel}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
