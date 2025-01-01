const express = require("express");

const weather = express();

weather.post("/", async (req, res) => {
    const  {city}  = req.body;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a322d39c25aa93e12bfe3ff1a6c68891&units=metric`
        );
        const data = await response.json();

        const dailyWeather = {};
        data.list.forEach(forecast => {
            const date = forecast.dt_txt.split(" ")[0]; 
            if (!dailyWeather[date]) {
                dailyWeather[date] = {
                    date,
                    temps: [],
                    humidity: [],
                    weather: [],
                    wind_speed: [],
                };
            }

            dailyWeather[date].temps.push(forecast.main.temp);
            dailyWeather[date].humidity.push(forecast.main.humidity);
            dailyWeather[date].weather.push(forecast.weather[0].main);
            dailyWeather[date].wind_speed.push(forecast.wind.speed);
        });

        const results = Object.keys(dailyWeather).map(date => {
            const day = dailyWeather[date];

            const weatherSummary = day.weather.map(type => {
                if (type.toLowerCase().includes("clear")) return "clear";
                if (type.toLowerCase().includes("cloud")) return "clouds";
                if (type.toLowerCase().includes("rain")) return "rain";
                return "other";
            });

            return {
                date: day.date,
                min_temp: Math.round(Math.min(...day.temps)),
                max_temp: Math.round(Math.max(...day.temps)),
                avg_humidity: (
                    day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length
                ).toFixed(2),
                weather_summary: [...new Set(weatherSummary)],
                avg_wind_speed: (
                    day.wind_speed.reduce((a, b) => a + b, 0) / day.wind_speed.length
                ).toFixed(2),
            };
        });

        res.send(results.slice(0, 5));
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch weather data", details: err });
    }
});

module.exports = weather;
