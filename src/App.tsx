import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import Configuration from './pages/Configuration';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#FF8C42' }}>
        <Sidebar />

        <div style={{ flex: 1, paddingLeft: '20px', paddingTop: '8px', overflow: 'auto' }}>
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            {/* <Route path="/config" element={<Configuration />} /> */}
             <Route path="/" element={<h1 style={{color: 'white'}}>Halaman Dashboard</h1>} />
             <Route path="/config" element={<h1 style={{color: 'white'}}>Halaman Config</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;