import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Modal from './Modal';
import './Configuration.css';

interface ColorOption {
  id: string;
  value: string;
}

interface ConfigurationProps {
  colors: ColorOption[];
  onAddColor: (hex: string) => void;
  onDeleteColor: (id: string) => void;
}

const Configuration = ({ colors, onAddColor, onDeleteColor }: ConfigurationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColorHex, setNewColorHex] = useState('');

  const isValidHex = /^#[0-9A-F]{6}$/i.test(newColorHex);

  const handleSave = () => {
    if (isValidHex) {
      onAddColor(newColorHex);
      setNewColorHex('');
      setIsModalOpen(false);
    } else {
      alert("Masukkan kode warna yang valid! Contoh: #FF0000");
    }
  };

  return (
    <div className="config-container">
      <div className="config-header">
        <h2>This is configuration page</h2>
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Color list</h3>

      <div className="color-grid">
        {colors.map((color) => (
          <div 
            key={color.id} 
            className="color-box" 
            style={{ backgroundColor: color.value }}
          >
            <button 
              className="delete-color-btn"
              onClick={() => {
                if(window.confirm("Hapus warna ini? Task yang pakai warna ini akan berubah jadi putih.")) {
                  onDeleteColor(color.id);
                }
              }}
            >
              <FaTimes />
            </button>
            <span className="color-label">{color.value}</span>
          </div>
        ))}

        <div className="add-color-box" onClick={() => setIsModalOpen(true)}>
          <FaPlus size={24} />
          <span>Add Color</span>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Color"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label>Color Hex Code (pakai #)</label>
            <input 
              type="text" 
              placeholder="#562CF0" 
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black' }}
            />
          </div>

          <div>
            <label>Preview</label>
            <div 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                backgroundColor: isValidHex ? newColorHex : '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                marginTop: '5px'
              }}
            >
              {isValidHex ? '' : 'No Preview Available'}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={!isValidHex}>Save</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Configuration;