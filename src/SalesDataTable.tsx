import './App.css';

import React, { useState } from 'react';

import salesData from './salesData.json';

interface SalesDataRow {
  company: string;
  "ytd sales": number;
  "last year sales": number;
  "current month sales": number;
  "last month sales": number;
  "current month total clients": number;
  "last month total clients": number;
  "current month prospect sales": number;
  "current month prospect clients": number;
}

interface Column {
  key: keyof SalesDataRow;
  label: string;
}

interface SortConfig {
  key: keyof SalesDataRow | null;
  direction: 'asc' | 'desc';
}

const columns: Column[] = [
  { key: 'company', label: 'Company' },
  { key: 'ytd sales', label: 'YTD Sales' },
  { key: 'last year sales', label: 'Last Year Sales' },
  { key: 'current month sales', label: 'Current Month Sales' },
  { key: 'last month sales', label: 'Last Month Sales' },
  { key: 'current month total clients', label: 'Current Month Total Clients' },
  { key: 'last month total clients', label: 'Last Month Total Clients' },
  { key: 'current month prospect sales', label: 'Current Month Prospect Sales' },
  { key: 'current month prospect clients', label: 'Current Month Prospect Clients' },
];

const SalesDataTable: React.FC = () => {
  const [data, setData] = useState<SalesDataRow[]>(salesData as SalesDataRow[]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  const onSort = (key: keyof SalesDataRow) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const getSortIndicator = (key: keyof SalesDataRow) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
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
                  {typeof row[col.key] === 'number'
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
