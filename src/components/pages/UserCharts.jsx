import "./UserCharts.css";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function UserCharts({ users }) {
  if (!users || users.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#555" }}>
        No data available for charts.
      </p>
    );
  }


  const bloodGroupData = getBloodGroupData(users);
  const ageGroupData = getAgeGroupData(users);

  function getBloodGroupData(users) {
    const result = {};
    users.forEach((user) => {
      const bg = user.bloodGroup;
      result[bg] = (result[bg] || 0) + 1;
    });
    return Object.keys(result).map((bg) => ({
      bloodGroup: bg,
      count: result[bg],
    }));
  }

  function getAgeGroupData(users) {
    const result = { "0-18": 0, "19-30": 0, "31-50": 0, "50+": 0 };
    users.forEach((user) => {
      const age = user.age || 0;
      if (age <= 18) result["0-18"]++;
      else if (age <= 30) result["19-30"]++;
      else if (age <= 50) result["31-50"]++;
      else result["50+"]++;
    });
    return Object.keys(result).map((ageGroup) => ({
      ageGroup,
      count: result[ageGroup],
    }));
  }

  return (
    <div className="charts-container">
      <div className="chart-block">
        <h2>User Count by Blood Group</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={bloodGroupData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="bloodGroup" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-block">
        <h2>User Age Group Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={ageGroupData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="ageGroup" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
