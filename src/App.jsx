import './styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('')

  const API_link = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a6bd7524d848d83499a8171e1d75ec23`;

 const searchLocation = async () => {
  try {
    const response = await axios.get(API_link);
    setData(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      alert('Error: Network error. Please check your internet connection and try again.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      alert('Error: Something went wrong. Please try again later.');
    }
  }
};


  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 1000);
    fetch(`https://api.quotable.io/random?tags=love|happiness&_=${randomNumber}`)
        .then((response) => response.json())
        .then((data) => setQuote(data));
  }, []);

  const time = new Date().getHours();

  function greeting() {
    if (time < 12) {
      return <><p>Good Morning!</p></>
    } else if (time < 18) {
      return <><p>Good Afternoon!</p></>
    } else {
      return <><p>Good Evening!</p></>
    }
  }


  return (

      <div className='app'>
        <div className="search">
          <input type="text"
                 value={location}
                 onChange={event => setLocation(event.target.value)}
                 onKeyDown={searchLocation}
                 placeholder='Search location' />
        </div>
        <div className='container'>
          <div className='top' >
            <div className='location'>
              {data.name ? <p>{data.name}</p> : greeting()}
            </div>
            <div className="temp">
              {data.main ? <h1>{Math.floor(data.main.temp)}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <img alt="" src={"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}/> : null}
              {data.weather ? <p className='bold'>{data.weather[0].description}</p> : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{Math.floor(data.main.feels_like)}°C</p> : null}
              {data.main ? <p className='text'>feels like</p> : null}
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{Math.floor(data.main.humidity)}</p> : null}
              {data.main ? <p className='text'>humidity</p> : <p>"{quote.content}" - {quote.author}</p>}
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed}</p> : null}
              {data.wind ? <p className='text'>wind speed</p> : null}
            </div>
          </div>
        </div>

      </div >
  );
}

export default App;
