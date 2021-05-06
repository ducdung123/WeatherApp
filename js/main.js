let renderWeather = () => {
    let address = document.getElementById('weather__in').value;
    axios({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s&address=${address}`,
        method: 'GET'
    })
        .then((res) => {
            // console.log(res.data.results[0].geometry.location);
            // console.log(res.data.results[0].formatted_address);
            // document.getElementById('txtAddress').value = res.data.results[0].formatted_address;
            let address = res.data.results[0].formatted_address;
            let data = res.data.results[0].geometry.location;
            getWeather(data.lat, data.lng, address);
        })
        .catch((rej) => {
            console.log(rej);
        })
}
let getWeather = (lat, lng, address) => {
    axios({
        // url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,daily&appid=f6e57b8b0083d328b4e416fab95e15f3`,
        url: `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=bf69f8a3a78341a7943b874e8e38c2cc`,

    })
        .then((res) => {
            // console.log(res);

            // weatherbit
            // console.log(res.data.data[0].temp);
            // console.log(res.data.data[0].weather.description);

            document.querySelector('.weather__address h3').innerText = address;
            document.querySelector('.weather__tem__number p').innerText = res.data.data[0].temp;
            let weather = res.data.data[0].weather.description;
            document.querySelector('.weather__content p').innerText = weather;
            if(weather.toLowerCase().search('cloud') != -1){
                // for(let value of document.querySelectorAll('.weather__icon div')){
                //     value.style.display = 'none';
                // }
                // console.log($('.weather__icon div'))
                $('.weather__icon div').css({
                    'display': 'none',
                })
                
                $('.weather--main').css({
                    // 'background': '#656D78',
                    'background': '#94D3FA',
                })
                $('.weather__input input').css({
                    'box-shadow': '0px 8px 5px -1px #656D78',
                })
                document.querySelector('.weather__icon .cloud').style.display = 'flex';
            }
            else if(weather.toLowerCase().search('rain') != -1){
                $('.weather__icon div').css({
                    'display': 'none',
                })
                
                $('.weather--main').css({
                    'background': '#41BA9C',
                })
                $('.weather__input input').css({
                    'box-shadow': '0px 8px 5px -1px #41BA9C',
                })
                document.querySelector('.weather__icon .rain').style.display = 'flex';
            }
            else{
                $('.weather__icon div').css({
                    'display': 'none',
                })
                
                $('.weather--main').css({
                    'background': '#4FC1E9',
                })
                $('.weather__input input').css({
                    'box-shadow': '0px 8px 5px -1px #4FC1E9',
                })
                document.querySelector('.weather__icon .sun').style.display = 'flex';
            }
        })
        .catch((rej) => {
            console.log(rej);
        })
}
document.getElementById('weather__click').onclick = renderWeather;