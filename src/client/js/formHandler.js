/* Global Variables */
let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d38a934f798f5d08a463eba5bba143cb&units=imperial';

function handleSubmit(event) {
    event.preventDefault()

    let zipCode = document.getElementById('name').value;

    // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // Client.checkForName(formText)

    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/test')
    //     .then(res => {
    //         return res.json()
    //     })
    //     .then(function(data) {
    //         document.getElementById('results').innerHTML = data.message
    //     })
    getWeather(baseUrl, zipCode, apiKey)
        //Post Data
        .then(function(data) {
            postData('/add', {
                temperature: data.main.temp,
            });
        })
        //update UI
        .then(function(res) { updateUI('/all') });
}

// /* Function to GET Web API Data*/
const getWeather = async(baseUrl, zipCode, apiKey) => {
    let url = baseUrl + zipCode + apiKey;
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error', error)
    }
}


// Async POST
const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        console.log(newData)
        return newData
    } catch (error) {
        console.log("error", error);
    }
}


// /* Function to GET Project Data */

const updateUI = async(url = '/all') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('results').innerHTML = `Temperature: ${allData.temperature}°F`;

    } catch (error) {
        console.log("error", error);
    }
}
export { handleSubmit }