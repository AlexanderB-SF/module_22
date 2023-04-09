const status = document.querySelector('#status');
const btn = document.querySelector('.btn-geo-screen');

// Функция, выводящая текст об ошибке
const error = () => {
  status.innerHTML = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  // Отправка запроса для получения данных о времени, дате и временной зоны
  getDateTimeAndTimezone(latitude, longitude);
}

btn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    status.innerHTML = 'Информация о местоположении недоступна';
  } else {
    status.innerHTML = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

// Функция для отправки запроса получения данных о времени, дате и временной зоны
function getDateTimeAndTimezone(latitude, longitude) {
  fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const timezone = data.timezone;
    const dateAndTime = data.date_time_txt;
    status.innerHTML = `Временная зона: ${timezone} <br> Местное дата и время: ${dateAndTime}`;
  })
  .catch (() => {
    status.innerHTML = 'Не удалось получить данные, ошибка запроса';
  });
};