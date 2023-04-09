const status = document.querySelector('#status');
const btn = document.querySelector('.btn-geo-screen');
const sizeScreen = document.querySelector('.size-screen');

const height = window.screen.height;
const width = window.screen.width;

// Функция, выводящая текст об ошибке
const error = () => {
  status.innerHTML = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  status.innerHTML = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

btn.addEventListener('click', () => {
  
  sizeScreen.innerHTML = `Ширина экрана: ${width} Высота экрана: ${height}`
  
  if (!navigator.geolocation) {
    status.innerHTML = 'Информация о местоположении недоступна';
  } else {
    status.innerHTML = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});