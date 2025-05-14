let timer;
let running = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');

startBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10); // Update every 10ms
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

pauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        running = false;
        pauseBtn.textContent = 'Resume';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        running = true;
        pauseBtn.textContent = 'Pause';
    }
});

lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    display.textContent = '00:00:00.000';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    lapsContainer.innerHTML = ''; // Clear laps
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000));

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function padMilliseconds(number) {
    return number < 100 ? (number < 10 ? '00' + number : '0' + number) : number;
}
