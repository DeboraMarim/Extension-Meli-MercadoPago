import React from 'react';
import './styles.css';

const Meli = () => {
  return (
    <div>
      <header className="header">
        <input 
          type="text" 
          className="searchInput" 
          placeholder="Buscar produtos, marcas e muito mais..."
        />
      </header>
      <h1 className="pageTitle">Meli Page</h1>
      {/* Conteúdo da página Meli */}
    </div>
  );
};

export default Meli;
