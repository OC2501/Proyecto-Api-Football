import { useState,useEffect } from "react";

const useGetData = (API) => {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch(API, { // Pasar API directamente como una cadena
          method: "GET",
          headers: {
              "x-rapidapi-key": "9c5d5a61428460a5623563d34f78155c",
              "x-rapidapi-host": "v3.football.api-sports.io",
          },
      })
     .then((response) => response.json()) // Asumiendo que la respuesta es JSON
     .then((data) => {
          console.log(data); // Asegúrate de que 'data' contiene 'response' antes de llamar a setData
          if (data && data.response) { // Verifica que 'data' y 'data.response' existan
              setData(data.response);
          }
      })
     .catch((error) => console.log("error", error));
  }, [API]); // Añade API como dependencia para que el efecto se ejecute cuando cambie

  return data;
}

export default useGetData