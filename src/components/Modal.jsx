import React from 'react';
import "../style/Modal.css"

export function PlayerModal({ player, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={player.photo} alt={`${player.name} - ${player.position}`} className="player-img" />
        <div className="player-info">
          <h3>{player.name}</h3>
          <p>Edad: {player.age}</p>
          <p>Número: {player.number}</p>
          <p>Puesto: {player.position}</p>
        </div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

