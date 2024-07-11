import React from 'react';
import ReactDOM from 'react-dom/client';
import RadarChart from './sonar grid';


function App() {
  return (
    <div>
      <RadarChart />
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

