import './App.css';
import React,{useState} from 'react';

const api = {
  key: "eb8829175d3edb9de8da0c6fbb66ca1b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery] = useState ('');
  const [weather,setWeather] = useState ({});

  const search = e =>{
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const btnSearch = () =>{
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
      console.log(result);
    });
  }

  const dateBuilder = (d) =>{
    let months = ["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"];
    let days = ["Duminica","Luni","Marti","Miercuri","Joi","Vineri","Sambata"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input type="text" placeholder="Search..." className='search-bar' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
          <button onClick={btnSearch} className="btn-find">Find</button>
        </div>
        {(typeof weather.main != "undefined") ? ( 
        <div>
            <div className="location-box">
            <div className="location">
              {weather.name} , {weather.sys.country}
            </div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
