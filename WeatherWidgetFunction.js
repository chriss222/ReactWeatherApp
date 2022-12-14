import {useState, useEffect} from 'react';

function WeatherWidget({location}){
    const [data, setData] = useState(null);

    useEffect(() => {
        if(location) {
            fetch(`http://api.weatherstack.com/current?access_key=126d00d4dc7e3ad72de2066d12f40627&query=${location}&units=f`)
                .then(res => res.json())
                .then(obj => setData(obj));
        }
    }, [location]);
    
    if(!data) {
        return <></>
    }

    if(data.success === false) {
        console.log(data);
        return (
            <>
                <h3>The location you have entered is not correct</h3>
            </>
        )
    }

    else {
        return(
            <div className="card">
                <img src={data.current.weather_icons[0]}/>
                <div className="card-body">
                    <h5 className="card-title">
                        {data.location.name}
                    </h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Temp: {data.current.temperature}</li>
                    <li className="list-group-item">{data.current.weather_descriptions[0]}</li>
                    <li className="list-group-item">Wind: {data.current.wind_speed} {data.current.wind_direction}</li>
                    <li className="list-group-item">Humidity: {data.current.humidity}</li>
                </ul>
            </div>
        )
    }
}

export default WeatherWidget;