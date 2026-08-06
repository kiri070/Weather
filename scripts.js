const body = document.getElementById("body");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windSpeed");
const weather = document.getElementById("weather");

//時間
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const hour = document.getElementById("hour");
const minutes = document.getElementById("minutes");

weather.textContent = "取得中...";
getWeather(); //天気データ取得
showUpdateTime(); //更新時間表示

//クリックイベント
document.addEventListener("click", (e) => {

    //更新ボタン
    if(e.target.id === "UpdateButton")
    {
        getWeather();
        showUpdateTime();
    }
});

//天気を取得する関数
async function getWeather()
{
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=34.69&longitude=135.50&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code");
    const data = await response.json();

    //天気の表示
    switch(data.current.weather_code)
    {
        case 0:
            weather.textContent = "🌞快晴";
            break;
        case 1:
            weather.textContent = "🌤晴れ";
            break;
        case 2:
            weather.textContent = "🌤晴れ 時々 曇り";
            break;
        case 3:
            weather.textContent = "☁曇り";
            break;
        case 61:
            weather.textContent = "🌧弱い雨";
            break;
        case 63:
            weather.textContent = "🌧雨";
            break;
        case 65:
            weather.textContent = "🌧強い雨";
            break;
        case 71:
            weather.textContent = "⛄雪";
            break;
        case 80:
            weather.textContent = "🌧にわか雨";
            break;
        case 95:
            weather.textContent = "⛈雷雨";
            break;
        default:
            weather.textContent = "データ範囲外";
            break;
    }

    //気温、湿度、風速
    temperature.textContent = "気温: " + data.current.temperature_2m + " ℃";
    humidity.textContent = "湿度: " + data.current.relative_humidity_2m + " %";
    windspeed.textContent = "風速: " + data.current.wind_speed_10m + " km/h";
}

//更新時間を表示する関数
function showUpdateTime()
{
    let dt = new Date();
    year.textContent = dt.getFullYear() + "年 ";
    month.textContent = (dt.getMonth() + 1) + "月 ";
    day.textContent = dt.getDate() + "日 ";
    hour.textContent = dt.getHours() + "時 ";
    minutes.textContent = dt.getMinutes() + "分 ";
}