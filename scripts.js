const body = document.getElementById("body");

//今日の天気
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windSpeed");
const weather = document.getElementById("weather");
//明日の天気
const weather_next = document.getElementById("weather_next");
const nextDay = document.getElementById("nextday");
const temperature_next = document.getElementById("temperature_next");
const humidity_next = document.getElementById("humidity_next");
const windspeed_next = document.getElementById("windSpeed_next");
//明後日の天気
const weather_afterTomorrow = document.getElementById("weather_afterTomorrow");
const nextDay_afterTomorrow = document.getElementById("afterTomorrowday");
const temperature_afterTomorrow = document.getElementById("temperature_afterTomorrow");
const humidity_afterTomorrow = document.getElementById("humidity_afterTomorrow");
const windspeed_afterTomorrow = document.getElementById("windSpeed_afterTomorrow");

//時間
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const hour = document.getElementById("hour");
const minutes = document.getElementById("minutes");

weather.textContent = "取得中...";
getWeather(); //天気データ取得
getDailyWeather();
showUpdateTime(); //更新時間表示

//クリックイベント
document.addEventListener("click", (e) => {

    //更新ボタン
    if(e.target.id === "UpdateButton")
    {
        getWeather();
        getDailyWeather();
        showUpdateTime();
    }
});

//今日の天気を取得する関数
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
    temperature.textContent = "気温🌡: " + data.current.temperature_2m + " ℃";
    humidity.textContent = "湿度💧: " + data.current.relative_humidity_2m + " %";
    windspeed.textContent = "風速🍃: " + data.current.wind_speed_10m + " km/h";
}

//明日以降の天気を取得する関数
async function getDailyWeather()
{
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=34.69&longitude=135.50&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,relative_humidity_2m_mean&timezone=Asia%2FTokyo");

    const data = await response.json();

    console.log(data);

    // === 明日 === //
    //天気の表示
    switch(data.daily.weather_code[1])
    {
        case 0:
            weather_next.textContent = "🌞快晴";
            break;
        case 1:
            weather_next.textContent = "🌤晴れ";
            break;
        case 2:
            weather_next.textContent = "🌤晴れ 時々 曇り";
            break;
        case 3:
            weather_next.textContent = "☁曇り";
            break;
        case 61:
            weather_next.textContent = "🌧弱い雨";
            break;
        case 63:
            weather_next.textContent = "🌧雨";
            break;
        case 65:
            weather_next.textContent = "🌧強い雨";
            break;
        case 71:
            weather_next.textContent = "⛄雪";
            break;
        case 80:
            weather_next.textContent = "🌧にわか雨";
            break;
        case 95:
            weather_next.textContent = "⛈雷雨";
            break;
        default:
            weather_next.textContent = "データ範囲外";
            break;
    }
    //日付
    nextDay.textContent = "[明日]";

    //気温、湿度、風速
    temperature_next.textContent = "最高気温🌡↑: " + data.daily.temperature_2m_max[1] + " ℃\n" + "最低気温🌡↓: " + data.daily.temperature_2m_min[1] + " ℃";
    humidity_next.textContent = "湿度💧: " + data.daily.relative_humidity_2m_mean[1] + " %";
    windspeed_next.textContent = "風速🍃: " + data.daily.wind_speed_10m_max[1] + " km/h";


    // === 明後日 === //
    //天気の表示
    switch(data.daily.weather_code[2])
    {
        case 0:
            weather_afterTomorrow.textContent = "🌞快晴";
            break;
        case 1:
            weather_afterTomorrow.textContent = "🌤晴れ";
            break;
        case 2:
            weather_afterTomorrow.textContent = "🌤晴れ 時々 曇り";
            break;
        case 3:
            weather_afterTomorrow.textContent = "☁曇り";
            break;
        case 61:
            weather_afterTomorrow.textContent = "🌧弱い雨";
            break;
        case 63:
            weather_afterTomorrow.textContent = "🌧雨";
            break;
        case 65:
            weather_afterTomorrow.textContent = "🌧強い雨";
            break;
        case 71:
            weather_afterTomorrow.textContent = "⛄雪";
            break;
        case 80:
            weather_afterTomorrow.textContent = "🌧にわか雨";
            break;
        case 95:
            weather_afterTomorrow.textContent = "⛈雷雨";
            break;
        default:
            weather_afterTomorrow.textContent = "データ範囲外";
            break;
    }
    //日付
    nextDay_afterTomorrow.textContent = "[明後日]";

    //気温、湿度、風速
    temperature_afterTomorrow.textContent = "最高気温🌡↑: " + data.daily.temperature_2m_max[2] + " ℃\n" + "最低気温🌡↓: " + data.daily.temperature_2m_min[2] + " ℃";
    humidity_afterTomorrow.textContent = "湿度💧: " + data.daily.relative_humidity_2m_mean[2] + " %";
    windspeed_afterTomorrow.textContent = "風速🍃: " + data.daily.wind_speed_10m_max[2] + " km/h";
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