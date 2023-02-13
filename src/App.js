import axios from 'axios';
import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const apiKey = "8df2f6556cc3755be320cc346008b922";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if(!cityName) return;
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(apiUrl).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log("err", err);
    })
  }

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  useEffect(() => {
    getWetherDetails("delhi")
  }, [])
  

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" value={inputCity} onChange={handleChangeInput}/>
          <button type="button" class="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="col-md12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img className='weatherIcon' src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="weatherimage" />
          <h5 className='weatherCity'>{data.name}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6> {/*converting temperature from kelvin to celsius */}
        </div>
      </div>
    </div>
  );
}

export default App;
