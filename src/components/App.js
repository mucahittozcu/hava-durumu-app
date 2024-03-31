"use client"
import axios from "axios"
import { useState, useEffect, useRef } from "react"

const App = () => {
    // input'tan gelen değer
const [city,setCity] = useState("")
const [time,setTime] = useState(getTime)
const [currentDay,setCurrrentDay] = useState(null)
let ref = useRef(null)
const API = "f1e5ed11e2e0517415593916a22d1f61" 
const lang = "tr"
const date = (d) => {
 let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
 let day = days[d.getDay() ]  
 
 return `${day} `
} 
function getTime() {
  return new Date()
}
const times = () => {
  setTime(getTime())
}
useEffect(() => {
 const interval = setInterval(times,1000);
  return () => clearInterval(interval)

},[])



const fetchWeather = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&lang=${lang}&units=metric`)

        setCurrrentDay(response.data)
        console.log(response.data);
        
    } catch (err) {
        console.error(`Kullanıcı konum izni reddedildi: 🧨 ${err.message}`);
    }
}
    
const handleSubmit = (e) => {
    e.preventDefault()
        fetchWeather()
        setCity("")
}
const handleChange = (event) => {
    setCity(event.target.value)
}

  return (
    <div className="container">
        <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>

      <input
        className="input"
        type="text"
        value={city}
        ref={ref}
        placeholder="Şehir giriniz"
        onChange={handleChange}
        />
    <button className="git-button">Git</button>
        </form>
        {currentDay && (
        <div>
          <h2>{currentDay.name.toUpperCase()}</h2>
          <p><b>{date(time)}{time.toLocaleTimeString()}</b></p>
          <p className="now">ŞU AN</p>
          <div className="temp">
          <p className="celcius">{currentDay.main.temp}</p>
          <p> &deg;C|&deg;F</p>
          </div>
          <h3>{currentDay.weather[0].description}</h3>
          <div className="feels">
          <p>Hissedilen: {currentDay.main.feels_like}&deg;C</p> 
          <p className="humidity">|   Nem:{currentDay.main.humidity}%</p>
          </div>
          <p>{currentDay.weather.icon}</p>
        </div>
      )}

    </div>
  )
}
export default App


// useEffect(() => {
//     if (city !== "") {
//       fetchWeather();
//     }
//   }, [city])


// const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (city !== "") {
//         fetchWeather();
//         ref.current.focus();
//       }
  
// }