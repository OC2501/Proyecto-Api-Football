import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/home.css";

const Home = () => {
  const API = "https://v3.football.api-sports.io/fixtures?live=all";
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(API, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9c5d5a61428460a5623563d34f78155c",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
     .then((response) => response.json())
     .then((data) => {
        setMatches(data.response);
      })
     .catch((error) => console.error("Error fetching matches:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <header className="App-header">
        <h1 className="title-home">Partidos en vivo</h1>
        {matches.length > 0
         ? matches.map((match1) => (
              <div className="container-home" key={match1.fixture.id}>
                <div className="team-home">
                  <h1>{match1.teams.home.name}</h1>
                  <img
                    src={match1.teams.home.logo}
                    className="img-team"
                    alt="Equipo local"
                  />
                  <h2 className="score"> {match1.goals.home} </h2>
                </div>
                <div className="div-vs">
                  <h1>VS</h1>
                  <p> {match1.fixture.status.elapsed} ' </p>
                </div>
                <div className="team-away">
                  <h1>{match1.teams.away.name}</h1>
                  <img
                    src={match1.teams.away.logo}
                    className="img-team"
                    alt="Equipo visitante"
                  />
                  <h2 className="score">{match1.goals.away}</h2>
                </div>
              </div>
            ))
          : null}
      </header>
      <Footer />
    </div>
  );
};

export default Home;
