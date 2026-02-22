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

	const getTimeRemaining = () => {
		// setInterval(updateTimer, 1000);

		// let deadline = '25 february 2026';
		let dateStop = new Date(deadline).getTime();
		let dateNow = new Date().getTime();
		let timeRemaining = (dateStop - dateNow) / 1000;
		let days = Math.floor(timeRemaining / 60 / 60 / 24); // days
		let minutes = Math.floor((timeRemaining / 60) % 60); // minutes
		let hours = Math.floor((timeRemaining / 60 / 60) % 24); // hours
		let seconds = Math.floor(timeRemaining % 60); // seconds

		return {
			timeRemaining, days, hours, minutes, seconds
		}

	}

	const updateClock = () => {
		let getTime = getTimeRemaining();
		// console.log(getTime);
		timerDays.textContent = getTime.days;
		timerHours.textContent = getTime.hours;
		timerMinutes.textContent = getTime.minutes;
		timerSeconds.textContent = getTime.seconds;

		if (getTime.timeRemaining >= 0)
			setTimeout(updateClock, 1000);
	}

	updateClock();
	// setInterval(countTimer, 1000, '25 february 2026');


}

export default timer;
