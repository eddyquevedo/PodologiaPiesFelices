/*=========================para dar dinamismo al tipeo de la ubicacion ================================*/
const app = document.getElementById('typewriter');
const typewriter = new Typewriter(app,{
    loop: true,
    delay: 75,
});

typewriter
.typeString('MANTEN TUS PIES SIEMPRE FELICES')
.pauseFor(300)
.start();
/*======================API para mostrar la temperatura y el icono en tiempo real================================*/
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=3433359&appid=6cbfe5b42c2ce238fa1098f5ea972d32`;

async function getTemperature() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temperature = Math.round(data.main.temp-273.15);
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('weather-icon').setAttribute('src', iconUrl);
    document.getElementById('weather-icon').setAttribute('alt', data.weather[0].description);
  } catch (error) {
    console.log(error);
  }
}
getTemperature(); // Llamar a la función para mostrar la temperatura al cargar la página
setInterval(getTemperature, 600000); // Actualizar la temperatura cada 10 minutos (600000 ms)

/*======================API para mostrar el dia y en tiempo real================================*/
function showCurrentDate() {
    const now = new Date();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const formattedDate = `${dayOfWeek}, ${day}/${month}/${year}`;
    document.getElementById('current-date').textContent = formattedDate;
    document.getElementById('current-day').textContent = dayOfWeek;
  }
  showCurrentDate(); // Llamar a la función para mostrar la fecha al cargar la página
  setInterval(showCurrentDate, 1000); // Actualizar la fecha cada segundo (1000 ms)
