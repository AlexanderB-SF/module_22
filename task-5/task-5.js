const textMessage = document.querySelector('#text-input');
const sendBtn = document.querySelector('.send');
const locationBtn = document.querySelector('.location');
const msgBlock = document.querySelector('.msg-block');
const wsUrl = 'wss://echo-ws-service.herokuapp.com/';
const msgInpClass = 'message-inp';
const msgOutClass = 'message-out';

let websocket;
// Функция вывода сообщения в HTML
function writeToScreen(message, classMsg) {
    let pre = document.createElement("p");
    let msgClass = classMsg === msgInpClass ? msgInpClass : msgOutClass;
    pre.classList.add(msgClass);
    pre.innerHTML = message;
    msgBlock.appendChild(pre);
}
// Срздание соединения 
websocket = new WebSocket(wsUrl);
websocket.onopen = function () {
    console.log("Соединение установлено");
};
websocket.onclose = function () {
    console.log("Соединение закрыто");
};
websocket.onerror = function (evt) {
    console.log('Ошибка, соединение прерванно' + evt.data);
};
// При клике отправка и вывод данных
sendBtn.addEventListener('click', () => {
    let messageInp = textMessage.value;
    if (!messageInp) return;

    websocket.send(messageInp);
    writeToScreen(messageInp, msgInpClass);

    websocket.onmessage = function (evt) {
        writeToScreen(evt.data, msgOutClass);
    };

    textMessage.value = '';
});

// При клике определние и вывод сообщения с сылкой на геолокацию
locationBtn.addEventListener('click', () => {
    // Функция, выводящая текст об ошибке
    const error = () => {
        console.log('Информация о местоположении недоступна');
    }
    // Функция, срабатывающая при успешном получении геолокации
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const linkLocation = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ваша геолокация</a>`;
        websocket.send(`Широта: ${latitude} Долгота: ${longitude}`);
        websocket.onmessage = function (evt) {
            console.log(evt.data);
        };
        writeToScreen(linkLocation, msgOutClass);
    }
    if (!navigator.geolocation) {
        console.log('Информация о местоположении недоступна');
    } else {
        console.log('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
