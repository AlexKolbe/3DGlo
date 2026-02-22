// Определение времени суток
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Доброе утро';
    if (hour >= 12 && hour < 18) return 'Добрый день';
    if (hour >= 18 && hour < 23) return 'Добрый вечер';
    return 'Доброй ночи';
}

// Дни недели на русском
const daysOfWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

// Форматирование времени с ведущим нулём
function formatTime(num) {
    return num < 10 ? '0' + num : num;
}

// Получение строки времени в формате HH:MM:SS AM/PM
function getCurrentTimeString() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = formatTime(now.getMinutes());
    const seconds = formatTime(now.getSeconds());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 часов = 12
    const hoursStr = formatTime(hours);
    return `${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

// Вычисление дней до нового года
function getDaysUntilNewYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYear = new Date(nextYear, 0, 1); // 1 января следующего года
    const diffMs = newYear - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Обновление всех элементов на странице
function updateAll() {
    document.getElementById('greeting').textContent = getGreeting();
    const today = new Date();
    document.getElementById('day').textContent = `Сегодня: ${daysOfWeek[today.getDay()]}`;
    document.getElementById('currentTime').textContent = `Текущее время: ${getCurrentTimeString()}`;
    document.getElementById('newYearCountdown').textContent = `До нового года осталось ${getDaysUntilNewYear()} дней`;
}

// Запуск обновления каждую секунду
updateAll(); // сразу при загрузке
setInterval(updateAll, 1000);