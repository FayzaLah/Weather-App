//Pull put the weather info from the API giving the long and alt

//after page loads
window.addEventListener('load', () => {

    let long;
    let alt;
    
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let iconID = document.querySelector('.icon');
    let degreeSection = document.querySelector('.temperature');
    let degreeSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                //console.log(position);
                long = position.coords.longitude;
                alt = position.coords.latitude;
                
                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = proxy +'https://api.darksky.net/forecast/8e4258da40a2409502c80d28f51061bd/'
                    + alt + ','+ long;
                
                fetch(proxy + "https://samples.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10&appid=b1b15e88fa797225412429c1c50c122a1")
                    .then(Response => {
                        return Response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const { temperature, summary, icon } = data.currently;
                        //Set the elements from the API
                        locationTimezone.textContent = data.timezone;
                        temperatureDescription.textContent = summary;
                        temperatureDegree.textContent = Math.floor(temperature);
                        
                        let celsius = (temperature - 32) * 5 / 9;
                        
                        //Set Icon 
                        setIcons(icon, iconID);

                        //Change temperature
                        degreeSection.addEventListener('click', () => {
                            if (degreeSpan.textContent === '°F') {
                                degreeSpan.textContent = '°C';
                                temperatureDegree.textContent = Math.floor(celsius);
                            } else {
                                degreeSpan.textContent = '°F';
                                temperatureDegree.textContent = Math.floor(temperature);
                            }
                        })
                })
            });
        
        
    }else{
        h1.innerHTML = "This is not working ";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({"color": "pink" });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        // start animation!
        skycons.play();
        skycons.set(iconID, Skycons[currentIcon]);

    }
})