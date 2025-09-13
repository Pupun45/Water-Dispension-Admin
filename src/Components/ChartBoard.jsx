import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Mon", revenue: 50, utilization: 40, consumption: 12, sessions: 2 },
  { name: "Tue", revenue: 20, utilization: 70, consumption: 9, sessions: 1 },
  { name: "Wed", revenue: 80, utilization: 45, consumption: 14, sessions: 5 },
  { name: "Thu", revenue: 40, utilization: 60, consumption: 10, sessions: 4 },
  { name: "Fri", revenue: 60, utilization: 55, consumption: 13, sessions: 3 },
  { name: "Sat", revenue: 30, utilization: 50, consumption: 7, sessions: 2 },
  { name: "Sun", revenue: 76.4, utilization: 47.99, consumption: 5.46, sessions: 4 },
];

const metrics = [
  {
    title: "Revenue",
    value: "₹76.4",
    change: "-69.98%",
    color: "red",
    key: "revenue",
  },
  {
    title: "Utilization",
    value: "47.99%",
    change: "309%",
    color: "green",
    key: "utilization",
  },
  {
    title: "Consumption",
    value: "5.46 kWh",
    change: "-64.61%",
    color: "red",
    key: "consumption",
  },
  {
    title: "Sessions",
    value: "4",
    change: "33.3%",
    color: "green",
    key: "sessions",
  },
];

const styles = {
  dashboard: {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f7f9fc",
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  metrics: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    gap: "10px",
    marginBottom: "30px",
  },
  card: (isActive) => ({
    backgroundColor: isActive ? "#e0f7fa" : "#fff",
    borderRadius: "8px",
    padding: "10px 12px",
    boxShadow: "0 0 8px rgba(0,0,0,0.04)",
    width: "22%", 
    minWidth: "120px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }),
  cardTitle: {
    margin: 0,
    fontSize: "14px",
    color: "#555",
  },
  cardValue: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "4px 0",
  },
  cardChange: {
    fontSize: "13px",
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
};

function ChartBoard() {
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  return (
    <div style={styles.dashboard}>
      <div style={styles.metrics}>
        {metrics.map((metric) => (
          <div
            key={metric.title}
            style={styles.card(selectedMetric === metric.key)}
            onClick={() => setSelectedMetric(metric.key)}
          >
            <h3 style={styles.cardTitle}>{metric.title}</h3>
            <p style={styles.cardValue}>{metric.value}</p>
            <span style={{ ...styles.cardChange, color: metric.color }}>
              {metric.change}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartBoard;
