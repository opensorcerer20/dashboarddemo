import './App.css';

import React, { useState } from 'react';

import salesData from './salesData.json';

const columns = [
  { key: "company", label: "Company" },
  { key: "ytd sales", label: "YTD Sales" },
  { key: "last year sales", label: "Last Year Sales" },
  { key: "current month sales", label: "Current Month Sales" },
  { key: "last month sales", label: "Last Month Sales" },
  { key: "current month total clients", label: "Current Month Total Clients" },
  { key: "last month total clients", label: "Last Month Total Clients" },
  {
    key: "current month prospect sales",
    label: "Current Month Prospect Sales",
  },
  {
    key: "current month prospect clients",
    label: "Current Month Prospect Clients",
  },
];

const SalesDataTable = () => {
  const [data, setData] = useState(salesData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <table className="sales-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => onSort(col.key)}>
                {col.label}
                {getSortIndicator(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.company + idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {typeof row[col.key] === "number"
                    ? row[col.key].toLocaleString()
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDataTable;
