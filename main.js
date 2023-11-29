async function getRegions(location) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=102fc52d92e04f80a2a142840232711&q=${location}`,
        {
            method: 'POST',
            mode: 'cors',
            
            headers: {
              'Content-Type': 'application/json'
        }
        }
        );
        let data = await response.json();
        let country = data.location.country
        let city = data.location.name
        let currentTempCelsius = data.current.temp_c
        let currentHumidity = data.current.humidity
        let currentWindSpeed = data.current.wind_kph
        return {country, city, currentHumidity, currentTempCelsius, currentWindSpeed}

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchData(location){
    try {
        const result = await getRegions(location);
        let hot = '☀️'
        let cold = '☃️'
        const country = document.createElement('div');
        country.innerText = result.country
        const city = document.createElement('div')
        city.innerText = result.city
        const humidity = document.createElement('div')
        humidity.innerText = `humidity: ${result.currentHumidity  }` 
        const temperature = document.createElement('div')
        if (result.currentTempCelsius < 10) {
            temperature.innerText = `temperature: ${result.currentTempCelsius}° ${cold}`
        } else if (result.currentTempCelsius > 20) {
            temperature.innerText = `temperature: ${result.currentTempCelsius}° ${hot}`

        }
        
        const windSpeed = document.createElement('div')
        windSpeed.innerText = `wind speed: ${result.currentWindSpeed}`

        const weatherContainer = document.querySelector('#weatherContainer');
        weatherContainer.innerHTML = null
        weatherContainer.appendChild(country)
        weatherContainer.appendChild(city)
        weatherContainer.appendChild(temperature)
        weatherContainer.appendChild(humidity)
        weatherContainer.appendChild(windSpeed)
        

        
        
    } catch (error) {
        console.error('Error:', error);
    }
};

const locationInput = document.querySelector('#location');
const form = document.querySelector('#form')
form.onsubmit = submitHandler

function submitHandler(e) {
    e.preventDefault()
   let inputtedLocation =  form['location'].value
   fetchData(inputtedLocation)
   
   
}