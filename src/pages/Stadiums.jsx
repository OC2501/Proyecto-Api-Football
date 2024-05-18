import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../style/stadium.css';

const Stadiums = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
     .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
     .then((data) => {
        console.log(data.response);
        setStadiums(data.response);
        setLoading(false);
      })
     .catch((error) => {
        console.error("error", error);
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
        <h1>ESTADIOS</h1>
        <p>Todos los estadios de primera división.</p>
        <div className="div-container-stadium">
          {stadiums.map((stadium1) => (
            <div className="div-stadium" key={stadium1.team.id}>
              <img
                src={ stadium1.venue.image }
                alt="Estadio"
                className="img-stadium"
              />
              <div>
                <p>{ stadium1.venue.name }</p>
                <p>Capacidad: { stadium1.venue.capacity }</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stadiums;
