/* Note: 
1. Do not overload if statement separate with functions
2. Change let to const
3. To display celsius first before farenheit
4. Remove dummy data
5. CSS to Sass
6. Remove unwanted files and folders
7. Web Accessibility
8. Responsive
*/

window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span');
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = 'http://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/3347aa4a27907e3931e124ced3ec2778/${lat},${long}`;
                
                fetch(api)
                .then(response => {
                    return response.json();
                }) 
                .then(data => {
                    const { temperature, summary, icon } = data.currently;

                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5/9);
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });            
            }
        );
        

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});