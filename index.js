const searchButton = document.querySelector('#search-btn')
const searchBar = document.querySelector('#weather-search')
const bodyOfPage = document.querySelector('body')
const existingWeatherBox = document.querySelector('.weather-box')
const errorDiv = document.querySelector('.error-text')

weatherObject = 0

currentTemp = "celsius"

async function getWeatherCelsius(location){
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?unitGroup=metric&key=Y6U4N5YS8TWME4R92T47V4SLS', {mode: 'cors'})
    if (response.status >= 400 && response.status <600){
        const errorDiv = document.createElement('div')
        errorDiv.classList.add('error-text')
        errorDiv.textContent = "Error, location not found. Please try again."
        bodyOfPage.appendChild(errorDiv)
        const existingWeatherBox = document.querySelector('.weather-box')
        if (existingWeatherBox !== null) {
        existingWeatherBox.remove()
        }
    } else {
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
    const existingWeatherBox = document.querySelector('.weather-box')
    const errorDiv = document.querySelector('.error-text')
    if (existingWeatherBox !== null) {
        existingWeatherBox.remove()
    }
    if ((errorDiv !== null) && (errorDiv.textContent != "")){
        errorDiv.remove()
    }
    //overall box creation//
    const weatherWidget = document.createElement('div')
    weatherWidget.classList.add('weather-box')
    //top section//
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
    //bottom section//
    const bottomBox = document.createElement('div')
    bottomBox.classList.add('bottom-weatherbox')
    //12am box//
    const twelveambox = document.createElement('div')
    twelveambox.classList.add('weather-subbox')
    const twelveampart1 = document.createElement('div')
    twelveampart1.classList.add('weather-subbox-text')
    twelveampart1.textContent = "12 am"
    const twelveampart2 = document.createElement('div')
    twelveampart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.twelveamweather[1]+".svg class=weathericonsmall>"
    const twelveampart3 = document.createElement('div')
    twelveampart3.textContent = weatherObject.weatherBreakdown.twelveamweather[0]
    twelveampart3.classList.add('weather-subbox-text')
    twelveambox.appendChild(twelveampart1)
    twelveambox.appendChild(twelveampart2)
    twelveambox.appendChild(twelveampart3)
    //3am box//
    const threeambox = document.createElement('div')
    threeambox.classList.add('weather-subbox')
    const threeampart1 = document.createElement('div')
    threeampart1.classList.add('weather-subbox-text')
    threeampart1.textContent = "3 am"
    const threeampart2 = document.createElement('div')
    threeampart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.threeamweather[1]+".svg class=weathericonsmall>"
    const threeampart3 = document.createElement('div')
    threeampart3.textContent = weatherObject.weatherBreakdown.threeamweather[0]
    threeampart3.classList.add('weather-subbox-text')
    threeambox.appendChild(threeampart1)
    threeambox.appendChild(threeampart2)
    threeambox.appendChild(threeampart3)
    //6am box//
    const sixambox = document.createElement('div')
    sixambox.classList.add('weather-subbox')
    const sixampart1 = document.createElement('div')
    sixampart1.classList.add('weather-subbox-text')
    sixampart1.textContent = "6 am"
    const sixampart2 = document.createElement('div')
    sixampart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.sixamweather[1]+".svg class=weathericonsmall>"
    const sixampart3 = document.createElement('div')
    sixampart3.textContent = weatherObject.weatherBreakdown.sixamweather[0]
    sixampart3.classList.add('weather-subbox-text')
    sixambox.appendChild(sixampart1)
    sixambox.appendChild(sixampart2)
    sixambox.appendChild(sixampart3)
    //9am box//
    const nineambox = document.createElement('div')
    nineambox.classList.add('weather-subbox')
    const nineampart1 = document.createElement('div')
    nineampart1.classList.add('weather-subbox-text')
    nineampart1.textContent = "9 am"
    const nineampart2 = document.createElement('div')
    nineampart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.nineamweather[1]+".svg class=weathericonsmall>"
    const nineampart3 = document.createElement('div')
    nineampart3.textContent = weatherObject.weatherBreakdown.nineamweather[0]
    nineampart3.classList.add('weather-subbox-text')
    nineambox.appendChild(nineampart1)
    nineambox.appendChild(nineampart2)
    nineambox.appendChild(nineampart3)
    //12pm box//
    const twelvepmbox = document.createElement('div')
    twelvepmbox.classList.add('weather-subbox')
    const twelvepmpart1 = document.createElement('div')
    twelvepmpart1.classList.add('weather-subbox-text')
    twelvepmpart1.textContent = "12 pm"
    const twelvepmpart2 = document.createElement('div')
    twelvepmpart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.twelvepmweather[1]+".svg class=weathericonsmall>"
    const twelvepmpart3 = document.createElement('div')
    twelvepmpart3.textContent = weatherObject.weatherBreakdown.twelvepmweather[0]
    twelvepmpart3.classList.add('weather-subbox-text')
    twelvepmbox.appendChild(twelvepmpart1)
    twelvepmbox.appendChild(twelvepmpart2)
    twelvepmbox.appendChild(twelvepmpart3)
    //3pm box//
    const threepmbox = document.createElement('div')
    threepmbox.classList.add('weather-subbox')
    const threepmpart1 = document.createElement('div')
    threepmpart1.classList.add('weather-subbox-text')
    threepmpart1.textContent = "3 pm"
    const threepmpart2 = document.createElement('div')
    threepmpart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.threepmweather[1]+".svg class=weathericonsmall>"
    const threepmpart3 = document.createElement('div')
    threepmpart3.textContent = weatherObject.weatherBreakdown.threepmweather[0]
    threepmpart3.classList.add('weather-subbox-text')
    threepmbox.appendChild(threepmpart1)
    threepmbox.appendChild(threepmpart2)
    threepmbox.appendChild(threepmpart3)
    //6pm box//
    const sixpmbox = document.createElement('div')
    sixpmbox.classList.add('weather-subbox')
    const sixpmpart1 = document.createElement('div')
    sixpmpart1.classList.add('weather-subbox-text')
    sixpmpart1.textContent = "6 pm"
    const sixpmpart2 = document.createElement('div')
    sixpmpart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.sixpmweather[1]+".svg class=weathericonsmall>"
    const sixpmpart3 = document.createElement('div')
    sixpmpart3.textContent = weatherObject.weatherBreakdown.sixpmweather[0]
    sixpmpart3.classList.add('weather-subbox-text')
    sixpmbox.appendChild(sixpmpart1)
    sixpmbox.appendChild(sixpmpart2)
    sixpmbox.appendChild(sixpmpart3)
    //9pm box//
    const ninepmbox = document.createElement('div')
    ninepmbox.classList.add('weather-subbox')
    const ninepmpart1 = document.createElement('div')
    ninepmpart1.classList.add('weather-subbox-text')
    ninepmpart1.textContent = "9 pm"
    const ninepmpart2 = document.createElement('div')
    ninepmpart2.innerHTML = "<img src=./images/icons/"+weatherObject.weatherBreakdown.ninepmweather[1]+".svg class=weathericonsmall>"
    const ninepmpart3 = document.createElement('div')
    ninepmpart3.textContent = weatherObject.weatherBreakdown.ninepmweather[0]
    ninepmpart3.classList.add('weather-subbox-text')
    ninepmbox.appendChild(ninepmpart1)
    ninepmbox.appendChild(ninepmpart2)
    ninepmbox.appendChild(ninepmpart3)
    const conversionBox = document.createElement('div')
    if (currentTemp == "celsius"){
    //convert to Farenheit
    const celsiusBox = document.createElement('div')
    celsiusBox.classList.add('conversion-text')
    celsiusBox.textContent = "Convert to Farenheit"
    conversionBox.appendChild(celsiusBox)
    } else if (currentTemp == "farenheit"){
        const farenheitBox = document.createElement('div')
        farenheitBox.classList.add('conversion-text')
        farenheitBox.textContent = "Convert to Celsius"
        conversionBox.appendChild(farenheitBox)
    }
    //appending//
    bodyOfPage.appendChild(weatherWidget)
    weatherWidget.appendChild(topBox)
    topBox.appendChild(dailyWeatherIcon)
    topBox.appendChild(temperatureBox)
    temperatureBox.appendChild(location)
    temperatureBox.appendChild(dailyTemperature)
    temperatureBox.appendChild(dailyDescription)
    weatherWidget.appendChild(bottomBox)
    bottomBox.appendChild(twelveambox)
    bottomBox.appendChild(threeambox)
    bottomBox.appendChild(sixambox)
    bottomBox.appendChild(nineambox)
    bottomBox.appendChild(twelvepmbox)
    bottomBox.appendChild(threepmbox)
    bottomBox.appendChild(sixpmbox)
    bottomBox.appendChild(ninepmbox)
    weatherWidget.appendChild(conversionBox)
    conversionBox.addEventListener('click',function(){
     
        const location = document.querySelector('.weather-location')
        getWeatherFarenheit(location.textContent)
        if (currentTemp == "celsius"){
        currentTemp = "farenheit"
        displayWeather()
        } else if (currentTemp == "farenheit"){
            currentTemp = "celsius"
            getWeatherCelsius(location.textContent)
            displayWeather()
    }})

}

searchButton.addEventListener('click', function(){
    getWeatherCelsius(searchBar.value)
})
 
const conversionBox = document.querySelector('.conversion-text')

getWeatherCelsius("Sydney")