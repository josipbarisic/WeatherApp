window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');
console.log(temperatureSection);
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = `https://cors-anywhere.herokuapp.com/`;
			const api =`${proxy}https://api.darksky.net/forecast/2adb454da99629b39bb0fe91a46a1f2c/${lat},${long}`;
			fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data =>{
				console.log(data);
				const {temperature, summary, icon} = data.currently;
				//Formula for Celsius
				let celsius = Math.floor((temperature-32) * (5/9));

				//Set DOM Elements from the API
				temperatureDegree.textContent = celsius;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;

				//Set Icon
				setIcons(icon, document.querySelector(".icon"));

				//Change temp to Celsius/Fahrenheit
				temperatureSection.addEventListener('click', () =>{
					if(temperatureSpan.textContent === "F")
					{
						temperatureSpan.textContent = "°C";
						temperatureDegree.textContent = celsius;
					}
					else
					{
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temperature;
					}
				});
			})
		});
	}
	else{
		alert("App cannot function properly without the geolocation.");
	}

	function setIcons(icon, iconID)
	{
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();

		return skycons.set(iconID, Skycons[currentIcon]);
	}
});