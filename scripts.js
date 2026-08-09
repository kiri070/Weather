const body = document.getElementById("body");

//今日の天気
const precipitation = document.getElementById("precipitation");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windSpeed");
const weather = document.getElementById("weather");
//明日の天気
const weather_next = document.getElementById("weather_next");
const nextDay = document.getElementById("nextday");
const precipitation_next = document.getElementById("precipitation_next");
const temperature_next = document.getElementById("temperature_next");
const humidity_next = document.getElementById("humidity_next");
const windspeed_next = document.getElementById("windSpeed_next");
//明後日の天気
const weather_afterTomorrow = document.getElementById("weather_afterTomorrow");
const nextDay_afterTomorrow = document.getElementById("afterTomorrowday");
const precipitation_afterTomorrow = document.getElementById("precipitation_afterTomorrow");
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
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=34.724733&longitude=135.606319&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code");
    const data = await response.json();

    // 天気の表示
    weather.textContent = judgeWeather(data.current.weather_code);

    //気温、湿度、風速
    temperature.textContent = "気温🌡: " + data.current.temperature_2m + " ℃";
    humidity.textContent = "湿度💧: " + data.current.relative_humidity_2m + " %";
    windspeed.textContent = "風速🍃: " + data.current.wind_speed_10m + " km/h";
}

//明日以降の天気を取得する関数
async function getDailyWeather()
{
    const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=34.724733&longitude=135.606319&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,relative_humidity_2m_mean,precipitation_probability_mean&timezone=Asia%2FTokyo");
    const data = await response.json();

    console.log(data);

    //現在(今日の降水確率)
    precipitation.textContent = "今日の降水確率: " + data.daily.precipitation_probability_mean[0] + " %";

    // === 明日 === //
    //天気の表示
    weather_next.textContent = judgeWeather(data.daily.weather_code[1])
    //日付
    nextDay.textContent = "[明日]";

    //降水確率気温、湿度、風速
    precipitation_next.textContent = "降水確率: " + data.daily.precipitation_probability_mean[1] + " %";
    temperature_next.textContent = "最高気温🌡↑: " + data.daily.temperature_2m_max[1] + " ℃\n" + "最低気温🌡↓: " + data.daily.temperature_2m_min[1] + " ℃";
    humidity_next.textContent = "湿度💧: " + data.daily.relative_humidity_2m_mean[1] + " %";
    windspeed_next.textContent = "風速🍃: " + data.daily.wind_speed_10m_max[1] + " km/h";


    // === 明後日 === //
    //天気の表示
    weather_afterTomorrow.textContent = judgeWeather(data.daily.weather_code[2])
    //日付
    nextDay_afterTomorrow.textContent = "[明後日]";

    //降水確率、気温、湿度、風速
    precipitation_afterTomorrow.textContent = "降水確率: " + data.daily.precipitation_probability_mean[2] + " %";
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

//天気を判断する関数
function judgeWeather(data)
{
    let weather;
    // 天気の表示
    switch(data)
    {
            case 0:
                weather = "🌞快晴";
                break;

            case 1:
                weather = "🌤晴れ";
                break;

            case 2:
                weather = "⛅晴れ 時々 曇り";
                break;

            case 3:
                weather = "☁曇り";
                break;

            case 45:
            case 48:
                weather = "🌫霧";
                break;

            case 51:
                weather = "🌧弱い霧雨";
                break;

            case 53:
                weather = "🌧霧雨";
                break;

            case 55:
                weather = "🌧強い霧雨";
                break;

            case 56:
                weather = "🌧弱い着氷性の霧雨";
                break;

            case 57:
                weather = "🌧強い着氷性の霧雨";
                break;

            case 61:
                weather = "🌧弱い雨";
                break;

            case 63:
                weather = "🌧雨";
                break;

            case 65:
                weather = "🌧強い雨";
                break;

            case 66:
                weather = "🌧弱い着氷性の雨";
                break;

            case 67:
                weather = "🌧強い着氷性の雨";
                break;

            case 71:
                weather = "🌨弱い雪";
                break;

            case 73:
                weather = "🌨雪";
                break;

            case 75:
                weather = "❄️強い雪";
                break;

            case 77:
                weather = "🌨雪あられ";
                break;

            case 80:
                weather = "🌦弱いにわか雨";
                break;

            case 81:
                weather = "🌦にわか雨";
                break;

            case 82:
                weather = "🌧強いにわか雨";
                break;

            case 85:
                weather = "🌨弱いにわか雪";
                break;

            case 86:
                weather = "🌨強いにわか雪";
                break;

            case 95:
                weather = "⛈雷雨";
                break;

            case 96:
                weather = "⛈弱い雹を伴う雷雨";
                break;

            case 99:
                weather = "⛈強い雹を伴う雷雨";
                break;

            default:
                weather = "データ範囲外";
                break;
    }
    return weather;
}