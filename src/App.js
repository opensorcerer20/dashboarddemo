import './App.css';

import React, { useState } from 'react';

import SalesDataTable from './SalesDataTable';

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const ButtonComponent = ({ label, active, setActiveTab }) => {
    return (
      <button
        className={active ? "tab active" : "tab"}
        onClick={() => setActiveTab(label)}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="App app-full-window">
      <div className="tabs">
        <ButtonComponent
          label="Dashboard"
          active={activeTab === "Dashboard"}
          setActiveTab={setActiveTab}
        />
        <ButtonComponent
          label="Sales Data"
          active={activeTab === "Sales Data"}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="tab-content">
        {activeTab === "Dashboard" && <div className="dashboard-empty"></div>}
        {activeTab === "Sales Data" && <SalesDataTable />}
      </div>
    </div>
  );
}

export default App;
