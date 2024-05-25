import React, { useEffect, useState } from 'react';
import "../style/PlayerCard.css";


export const PlayerTemplate = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "9c5d5a61428460a5623563d34f78155c",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    )
   .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
   .then((data) => {
        console.log(data.response);
        // Asegúrate de que esta línea acceda correctamente a los datos de los jugadores
        setPlayers(data.response[0]?.players || []); // Ajusta según la estructura de tus datos
        setLoading(false);
      })
   .catch((error) => {
        console.error("error", error);
        setError(error.message);
        setLoading(false);
      });
  }, [teamId]); // Dependencia en teamId para refrescar los datos cuando cambie

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container-players">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <img src={player.photo} alt={`${player.name} - ${player.position}`} className="player-img" />
            <div className="player-info">
              <h3>{player.name}</h3>
              <p>Edad: {player.age}</p>
              <p>Número: {player.number}</p>
              <p>Puesto: {player.position}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
  