import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/standings.css";

const Standings = () => {
    const [standingsData, setStandingsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch("https://v3.football.api-sports.io/standings?league=39&season=2023", {
        method: "GET",
        headers: {
          "x-rapidapi-key": "9c5d5a61428460a5623563d34f78155c",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      })
   .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Accede a los datos de las clasificaciones
        const standings = data.response[0]?.league.standings[0] || [];
        setStandingsData(standings);
        setLoading(false);
      })
   .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <>
        <Navbar />
        <div className="header">
          <h1>CLASIFICACIONES</h1>
          <p>Clasificación actual de la Premier League.</p>
          <table className="standings-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Escudo</th>
            <th>Equipo</th>
            <th>Victorias</th>
            <th>Derrotas</th>
            <th>Empates</th>
            <th>Goles Marcados</th>
            <th>Goles Recibidos</th>
            <th>Diferencia de Goles</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {standingsData.length > 0? (
            standingsData.map((standing, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <img src={standing.team.logo} alt={standing.team.name} onError={(e) => {e.target.onerror = null; e.target.src="https://media.api-sports.io/football/teams/.png";}}/>
                </td>
                <td>{standing.team?.name}</td>
                <td>{standing.all.win}</td>
                <td>{standing.all.lose}</td>
                <td>{standing.all.draw}</td>
                <td>{standing.all.goals.for}</td>
                <td>{standing.all.goals.against}</td>
                <td>{standing.goalsDiff}</td>
                <td>{standing.points}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="9">No hay datos disponibles.</td></tr>
          )}
        </tbody>
      </table>
          </div>
        <Footer />
      </>
    );
};

export default Standings;