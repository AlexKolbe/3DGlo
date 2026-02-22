//
const timer = (deadline) => {
	// console.log(`one.js`);
	console.log(deadline);
	const timerHours = document.getElementById('timer-hours');
	const timerMinutes = document.getElementById('timer-minutes');
	const timerSeconds = document.getElementById('timer-seconds');
	const timerDays = document.getElementById('timer-days');
	// console.log(timerHours);
	// console.log(timerMinutes);
	// console.log(timerSeconds);

	const formatTime = (num) => {
		return num < 10 ? `0${num}` : num.toString();
	};

	const getTimeRemaining = () => {
		// let deadline = '25 february 2026';
		let dateStop = new Date(deadline).getTime();
		let dateNow = new Date().getTime();
		let timeRemaining = (dateStop - dateNow) / 1000;
		let days = Math.floor(timeRemaining / 60 / 60 / 24); // days
		let hours = Math.floor((timeRemaining / 60 / 60) % 24); // hours
		let minutes = Math.floor((timeRemaining / 60) % 60); // minutes
		let seconds = Math.floor(timeRemaining % 60); // seconds

		return {
			timeRemaining, days, hours, minutes, seconds
		}
	}

	const updateClock = () => {
		let getTime = getTimeRemaining();
		// console.log(getTime);

		if (getTime.timeRemaining <= 0) {
			// Если время вышло, устанавливаем нули и останавливаем интервал
			timerDays.textContent = '00';
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
			clearInterval(intervalId);
			return;
		}

		timerDays.textContent = formatTime(getTime.days);
		timerHours.textContent = formatTime(getTime.hours);
		timerMinutes.textContent = formatTime(getTime.minutes);
		timerSeconds.textContent = formatTime(getTime.seconds);
	}

	// Запускаем интервал сразу и сохраняем его ID для возможной очистки
	const intervalId = setInterval(updateClock, 1000);
	// Вызываем сразу, чтобы не ждать первую секунду
	updateClock();


}

export default timer;
