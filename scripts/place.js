/* ================================
WEATHER DATA
================================ */

const temperature = 10;
const windSpeed = 5;

/* ================================
WIND CHILL FUNCTION
================================ */

function calculateWindChill(temp, speed) {
return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16));
}

/* ================================
DISPLAY WEATHER VALUES
================================ */

document.querySelector('#temperature').textContent = temperature;

document.querySelector('#wind-speed').textContent = windSpeed;

/* ================================
DISPLAY WIND CHILL
================================ */

const windChillElement = document.querySelector('#wind-chill');

if (temperature <= 10 && windSpeed > 4.8) {
const windChill = calculateWindChill(temperature, windSpeed);
windChillElement.textContent = `${windChill.toFixed(1)} °C`;
} else {
windChillElement.textContent = 'N/A';
}

/* ================================
FOOTER YEAR
================================ */

document.querySelector('#currentyear').textContent =
new Date().getFullYear();

/* ================================
LAST MODIFIED DATE
================================ */

document.querySelector('#lastmodified').textContent =
document.lastModified;
