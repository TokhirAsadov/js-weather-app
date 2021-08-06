"use strict";

const api = {
  keys: "9d3c6c27bc6c4453fd59ba43998e64a3",
  baseurl: "https://api.openweathermap.org/data/2.5/",
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keyup', setQuery)

function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.keys}`)
    .then((weather) => {
      return weather.json()
    })
    .then(displayResults)
}

function displayResults(weather) {
  console.log(weather)
  let city = document.querySelector('.location .city')
  city.innerHTML = `
    ${weather.name}, ${weather.sys.country}
  `
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

  let weatherEl = document.querySelector('.weather');
  weatherEl.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}<span>°C</span> / ${Math.round(weather.main.temp_max)}<span>°C</span>`
}

function dateBuilder(t) {
  let months = ['January',
    'February',
    'March',
    'April',
    "May",
    "June",
    'July',
    "August",
    "September",
    'October',
    'November',
    'December'];

  let days = ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];

  let day = days[t.getDay()];
  let date = t.getDate();
  let month = months[t.getMonth()];
  let year = t.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};