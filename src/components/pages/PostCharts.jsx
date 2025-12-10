import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
} from "recharts";
import "./UserCharts.css";

export default function PostCharts({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#555" }}>
        No data available for charts.
      </p>
    );
  }

  const reactionsData = getReactionsData(posts);
  const viewsData = getViewsData(posts);

  function getReactionsData(posts) {
    let totalLikes = 0;
    let totalDislikes = 0;

    posts.forEach((post) => {
      totalLikes += post.reactions.likes;
      totalDislikes += post.reactions.dislikes;
    });

    return [
      { reactions: "Likes 👍", count: totalLikes },
      { reactions: "Dislikes 👎", count: totalDislikes },
    ];
  }

  function getViewsData(posts) {
    const result = {};
    posts.forEach((post) => {
      const views = post.views || 0;
      result[views] = (result[views] || 0) + 1;
    });
    return Object.keys(result).map((views) => {
      return { views, count: result[views] };
    });
  }

  return (
    <div className="charts-conatiner">
      <div className="chart-block">
        <h2>Post Count by Reactions</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={reactionsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="reactions" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4e6ef2" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-block">
        <h2>Post Views Data Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={viewsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="views" />
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
