import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import KanbanBoard from './components/KanbanBoard';
import Configuration from './components/Configuration';

const INITIAL_COLORS = [
  { id: '1', value: '#FF5555' }, // Merah
  { id: '2', value: '#5555FF' }, // Biru
  { id: '3', value: '#55FF55' }, // Hijau
];

function App() {
  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem('binusFlowColors');
    return saved ? JSON.parse(saved) : INITIAL_COLORS;
  });

  useEffect(() => {
    localStorage.setItem('binusFlowColors', JSON.stringify(colors));
  }, [colors]);

  const addColor = (hex: string) => {
    const newColor = { id: Date.now().toString(), value: hex };
    setColors([...colors, newColor]);
  };

  const deleteColor = (idToDelete: string) => {
    const colorToDelete = colors.find((c: { id: string; }) => c.id === idToDelete);
    
    setColors(colors.filter((c: { id: string; }) => c.id !== idToDelete));

    if (colorToDelete) {
      const tasks = JSON.parse(localStorage.getItem('binusFlowTasks') || '[]');
      const updatedTasks = tasks.map((t: any) => {
        if (t.color === colorToDelete.value) {
          return { ...t, color: '#FF8C42' }; 
        }
        return t;
      });
      localStorage.setItem('binusFlowTasks', JSON.stringify(updatedTasks));
      if (window.confirm("Warna dihapus. Halaman akan direfresh untuk update task.")) {
         window.location.reload();
      }
    }
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#FF8C42' }}>
        <Sidebar />
        <div style={{ flex: 1, paddingLeft: '20px', paddingTop: '10px', overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<KanbanBoard availableColors={colors} />} />
            <Route path="/config" element={<Configuration colors={colors} onAddColor={addColor} onDeleteColor={deleteColor} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;