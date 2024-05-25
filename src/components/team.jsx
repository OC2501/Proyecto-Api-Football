import { useState, useEffect } from "react";
import "../style/team.css"; 
import { PlayerTemplate} from "../components/PlayerTemplate";


const Team = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  

  useEffect(() => {
    fetch(
      "https://v3.football.api-sports.io/teams?country=England&league=39&season=2023",
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
        const newData = JSON.parse(JSON.stringify(data.response));
        setTeams(newData);
      })
  .catch((error) => console.log("error", error));
  }, []);


  const handleClick = (teamId) => {
    setSelectedTeamId(teamId); 
    console.log(selectedTeamId)
  };

  return (
    <div className="container-main">
      {teams.length > 0
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
                <button onClick={() => handleClick(team1.team.id)} className="btn-primary">
                  Ver jugadores
                </button>
              </div>
            </div>
          ))
        : <p>Cargando...</p>}
      {selectedTeamId!== null && <PlayerTemplate teamId={selectedTeamId} />}
    </div>
  );
}

export default Team;