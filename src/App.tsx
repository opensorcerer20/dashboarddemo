import './App.css';

import React, { useState } from 'react';

import SalesDataTable from './SalesDataTable';

interface ButtonComponentProps {
  label: string;
  active: boolean;
  setActiveTab: (tab: string) => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ label, active, setActiveTab }) => {
  return (
    <button
      className={active ? 'tab active' : 'tab'}
      onClick={() => setActiveTab(label)}
    >
      {label}
    </button>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  return (
    <div className="App app-full-window">
      <div className="tabs">
        <ButtonComponent
          label="Dashboard"
          active={activeTab === 'Dashboard'}
          setActiveTab={setActiveTab}
        />
        <ButtonComponent
          label="Sales Data"
          active={activeTab === 'Sales Data'}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="tab-content">
        {activeTab === 'Dashboard' && <div className="dashboard-empty"></div>}
        {activeTab === 'Sales Data' && <SalesDataTable />}
      </div>
    </div>
  );
};

export default App;
