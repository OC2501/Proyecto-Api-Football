import { useState, useEffect } from "react";
import "../style/team.css"; 

const Team = () => {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    fetch(
      "https://v3.football.api-sports.io/teams?country=Uruguay&league=270&season=2021",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "9c5d5a61428460a5623563d34f78155c",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    )
     .then((response) => response.json())
     .then((data) => {
        console.log(data.response);
        setTeams(data.response);
      })
     .catch((error) => console.log("error", error));
  }, []);

  function verEstado() {
    console.log(teams); // Corregido para usar 'teams'
  }

  return (
    <div className="container-main">
      {teams
       ? teams.map((team1) => (
            <div className="container" key={team1.team.id}>
              <div className="div-logo">
                <img
                  src={team1.team.logo}
                  alt="logo de Nacional"
                  className="img-logo"
                />
              </div>
              <div className="info-team">
                <h1>{team1.team.name}</h1>
                <p>Fundado: {team1.team.founded}</p>
                <p>Estadio: {team1.venue.name}</p>
                <button onClick={verEstado} className="btn-primary">
                  Ver jugadores
                </button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Team;