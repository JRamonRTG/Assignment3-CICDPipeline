const apiKey = '2bfd3211df23f2d600ef10c05d08d9af';

// presionar enter
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    getWeather();
  }
}

// Get weather data
async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const card = document.getElementById('weatherCard');

  if (!city) {
    showError('Por favor ingresa una ciudad.');
    return;
  }

  showLoading();
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Ciudad no encontrada');
    }

    const data = await response.json();
    displayWeather(data);
    updateWeatherEffect(data.weather[0].main.toLowerCase());
    
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

// letra de carga mientras busca
function showLoading() {
  const card = document.getElementById('weatherCard');
  card.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      Buscando información del clima...
    </div>
  `;
  card.classList.remove('hidden');
  card.classList.add('show');
}

//  error message
function showError(message) {
  const card = document.getElementById('weatherCard');
  card.innerHTML = `<div class="error">${message}</div>`;
  card.classList.remove('hidden');
  card.classList.add('show');
}

// mostrar data de clima
function displayWeather(data) {
  const card = document.getElementById('weatherCard');
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  
  card.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
    <div class="city-name">${data.name}, ${data.sys.country}</div>
    <div class="weather-description">${description.charAt(0).toUpperCase() + description.slice(1)}</div>
    <div class="temperature">${Math.round(data.main.temp)}°C</div>
    
    <div class="weather-stats">
      <div class="stat-item">
        <div class="stat-label">Sensación térmica</div>
        <div class="stat-value">${Math.round(data.main.feels_like)}°C</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Humedad</div>
        <div class="stat-value">${data.main.humidity}%</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Viento</div>
        <div class="stat-value">${data.wind.speed} m/s</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Presión</div>
        <div class="stat-value">${data.main.pressure} hPa</div>
      </div>
    </div>
  `;
  
  card.classList.remove('hidden');
  card.classList.add('show');
}

// efecto segun el clima (aun en beta)
function updateWeatherEffect(weatherMain) {
  const effect = document.getElementById('weatherEffect');
  
  // clases de clima
  effect.classList.remove('rain', 'snow', 'clouds', 'sunny', 'active');
  
  // clase puesta segun el clima
  if (weatherMain.includes('rain') || weatherMain.includes('drizzle') || weatherMain.includes('thunderstorm')) {
    effect.classList.add('rain');
  } else if (weatherMain.includes('snow')) {
    effect.classList.add('snow');
  } else if (weatherMain.includes('cloud')) {
    effect.classList.add('clouds');
  } else if (weatherMain.includes('clear')) {
    effect.classList.add('sunny');
  }
  
  // Activar efecto
  setTimeout(() => {
    effect.classList.add('active');
  }, 100);
}

// modo oscuro
function toggleMode() {
  document.body.classList.toggle('dark');
  const modeButton = document.querySelector('.toggle-mode');
  modeButton.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  
  // preferencias
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// theme que se guardo
function loadThemePreference() {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'true') {
    document.body.classList.add('dark');
    document.querySelector('.toggle-mode').textContent = '☀️';
  }
}

// inicializar app
document.addEventListener('DOMContentLoaded', () => {
  loadThemePreference();
  
  // focus de la ciudad / input de la misma
  document.getElementById('cityInput').focus();
});