import './App.css';
import React, { useEffect, useState } from 'react';
import axiosConfig from './api/axiosConfig';

function App() {
  const [cars, setCars] = useState([]);

  const fetch = async () => {
    const response = await axiosConfig.get("/api/v1/cars");
    setCars(response.data);
    console.log(response)
  }

  useEffect(() => {
    fetch();
  }, [])
  return (
    <div className="App">
      {cars.map((i, idx) => {
        return (
          <div key={idx}>
            <h1>{i.year}</h1>
            {i.make}
            {i.reviewIds.length ? i.reviewIds.map((i) => {
              return <li>{i.body}</li>
            }) : null}
          </div>
        )
      })}
    </div>
  );
}

export default App;
