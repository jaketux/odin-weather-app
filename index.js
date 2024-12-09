const searchButton = document.querySelector('#search-btn')
const searchBar = document.querySelector('#weather-search')


weatherObject = 0

async function getWeatherCelsius(location){
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?unitGroup=metric&key=Y6U4N5YS8TWME4R92T47V4SLS', {mode: 'cors'})
    response.json().then(function(response){
        weatherObject = {
            name: response.resolvedAddress,
            todaysTemperature: response.days[0].temp+'°c',
            todaysHumidity: response.days[0].humidity+'%',
            todaysForecast: response.days[0].icon,
            weatherDescription: response.days[0].description,
            weatherBreakdown: {
            twelveamweather: [response.days[0].hours[0].temp+'°c', response.days[0].hours[0].icon],
            threeamweather: [response.days[0].hours[3].temp+'°c', response.days[0].hours[3].icon],
            sixamweather: [response.days[0].hours[6].temp+'°c', response.days[0].hours[6].icon],
            nineamweather: [response.days[0].hours[9].temp+'°c', response.days[0].hours[9].icon],
            twelvepmweather: [response.days[0].hours[12].temp+'°c', response.days[0].hours[12].icon],
            threepmweather: [response.days[0].hours[15].temp+'°c', response.days[0].hours[15].icon],
            sixpmweather: [response.days[0].hours[18].temp+'°c', response.days[0].hours[18].icon],
            ninepmweather: [response.days[0].hours[21].temp+'°c', response.days[0].hours[21].icon]}
        }  
        displayWeather()
    })
}

async function getWeatherFarenheit(location){
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?unitGroup=us&key=Y6U4N5YS8TWME4R92T47V4SLS', {mode: 'cors'})
    response.json().then(function(response){
         weatherObject = {
            name: response.resolvedAddress,
            todaysTemperature: response.days[0].temp+'°F',
            todaysHumidity: response.days[0].humidity+'%',
            todaysForecast: response.days[0].icon,
            weatherDescription: response.days[0].description,
            weatherBreakdown: {
            twelveamweather: [response.days[0].hours[0].temp+'°F', response.days[0].hours[0].icon],
            threeamweather: [response.days[0].hours[3].temp+'°F', response.days[0].hours[3].icon],
            sixamweather: [response.days[0].hours[6].temp+'°F', response.days[0].hours[6].icon],
            nineamweather: [response.days[0].hours[9].temp+'°F', response.days[0].hours[9].icon],
            twelvepmweather: [response.days[0].hours[12].temp+'°F', response.days[0].hours[12].icon],
            threepmweather: [response.days[0].hours[15].temp+'°F', response.days[0].hours[15].icon],
            sixpmweather: [response.days[0].hours[18].temp+'°F', response.days[0].hours[18].icon],
            ninepmweather: [response.days[0].hours[21].temp+'°F', response.days[0].hours[21].icon]},
        }
        displayWeather()
    })
}

function displayWeather (){
    const bodyOfPage = document.querySelector('body')
    const weatherWidget = document.createElement('div')
    weatherWidget.classList.add('weather-box')
    const topBox = document.createElement('div')
    topBox.classList.add('top-weatherbox')
    const dailyWeatherIcon = document.createElement('div')
    dailyWeatherIcon.classList.add('daily-weather-icon')
    dailyWeatherIcon.innerHTML = "<img src=./images/icons/"+weatherObject.todaysForecast+".svg class=weathericonlarge>"
    const temperatureBox = document.createElement('div')
    temperatureBox.classList.add('temperature-box')
    const location = document.createElement('div')
    location.classList.add('weather-location')
    location.textContent = weatherObject.name
    const dailyTemperature = document.createElement('div')
    dailyTemperature.classList.add('daily-temperature')
    dailyTemperature.textContent = weatherObject.todaysTemperature
    const dailyDescription = document.createElement('div')
    dailyDescription.classList.add('daily-description')
    dailyDescription.textContent = weatherObject.weatherDescription
    bodyOfPage.appendChild(weatherWidget)
    weatherWidget.appendChild(topBox)
    topBox.appendChild(dailyWeatherIcon)
    topBox.appendChild(temperatureBox)
    temperatureBox.appendChild(location)
    temperatureBox.appendChild(dailyTemperature)
    temperatureBox.appendChild(dailyDescription)
}

searchButton.addEventListener('click', function(){
    getWeatherCelsius(searchBar.value)
})
 

getWeatherCelsius("Glenmore Park")