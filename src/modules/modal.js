const modal = () => {
	console.log('modal.js');
	const buttons = document.querySelectorAll('.popup-btn');
	const modal = document.querySelector('.popup');
	const closeBtn = modal.querySelector('.popup-close');

	// Проверка на мобильное устройство (ширина экрана меньше 768px)
	const isMobile = () => window.innerWidth < 768;

	// Устанавливаем начальные стили для модального окна
	modal.style.display = 'none';
	modal.style.opacity = '0';
	modal.style.transition = 'none'; // Отключаем CSS-переходы

	// Функция для анимации появления (fade in)
	const fadeIn = (element, duration = 400) => {
		// Для мобильных устройств показываем без анимации
		if (isMobile()) {
			element.style.display = 'block';
			element.style.opacity = '1';
			return Promise.resolve();
		}

		return new Promise((resolve) => {
			element.style.display = 'block';
			let startTime = null;

			const animate = (currentTime) => {
				if (!startTime) startTime = currentTime;
				const progress = currentTime - startTime;
				const opacity = Math.min(progress / duration, 1);

				element.style.opacity = opacity;

				if (progress < duration) {
					requestAnimationFrame(animate);
				} else {
					element.style.opacity = '1';
					resolve();
				}
			};

			requestAnimationFrame(animate);
		});
	};

	// Функция для анимации исчезновения (fade out)
	const fadeOut = (element, duration = 300) => {
		// Для мобильных устройств скрываем без анимации
		if (isMobile()) {
			element.style.display = 'none';
			element.style.opacity = '0';
			return Promise.resolve();
		}

		return new Promise((resolve) => {
			let startTime = null;

			const animate = (currentTime) => {
				if (!startTime) startTime = currentTime;
				const progress = currentTime - startTime;
				const opacity = Math.max(1 - progress / duration, 0);

				element.style.opacity = opacity;

				if (progress < duration) {
					requestAnimationFrame(animate);
				} else {
					element.style.display = 'none';
					element.style.opacity = '0';
					resolve();
				}
			};

			requestAnimationFrame(animate);
		});
	};

	// Обработчики для кнопок открытия
	buttons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			fadeIn(modal);
		});
	});

	// Обработчик для кнопки закрытия
	closeBtn.addEventListener('click', (e) => {
		e.preventDefault();
		fadeOut(modal);
	});

	// Закрытие по клику вне модального окна
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			fadeOut(modal);
		}
	});

	// Обработчик изменения размера окна для переключения режимов
	window.addEventListener('resize', () => {
		// Если становимся на мобильное устройство и модальное окно открыто
		if (isMobile() && modal.style.display === 'block') {
			modal.style.opacity = '1';
		}
	});
};

export default modal;
