//
const validator = () => {
	console.log('validator.js');

	// 1. Валидация для калькулятора (только цифры)
	const calcInputs = document.querySelectorAll('#calc input[type="text"]');

	calcInputs.forEach(input => {
		input.addEventListener('input', (e) => {
			// Удаляем все символы, кроме цифр
			e.target.value = e.target.value.replace(/[^\d]/g, '');
		});
	});

	// 2. Валидация для всех форм
	const forms = document.querySelectorAll('form');

	forms.forEach(form => {
		// Получаем все поля ввода в текущей форме
		const inputs = form.querySelectorAll('input, textarea');

		inputs.forEach(input => {
			// Определяем тип поля и применяем соответствующую валидацию
			input.addEventListener('input', (e) => {
				const field = e.target;
				const fieldType = field.type;
				const fieldPlaceholder = field.placeholder;

				// Поле сообщения (textarea или input с placeholder="Ваше сообщение")
				if (field.tagName.toLowerCase() === 'textarea' || fieldPlaceholder.includes('сообщение')) {
					// Только кириллица, дефис и пробел
					field.value = field.value.replace(/[^а-яёА-ЯЁ\-\s]/g, '');
				}
				// Поле email
				else if (fieldType === 'email') {
					// Латинница, цифры, спецсимволы: @ - _ . ! ~ * '
					field.value = field.value.replace(/[^a-zA-Z0-9@\-_\.!~*']/g, '');
				}
				// Поле телефон
				else if (fieldType === 'tel') {
					// Только цифры, круглые скобки и дефис
					field.value = field.value.replace(/[^\d\(\)\-]/g, '');
				}
				// Поле текст (но не калькулятор и не email и не tel)
				else if (fieldType === 'text' && !field.classList.contains('calc-item')) {
					// Только кириллица, дефис и пробел
					field.value = field.value.replace(/[^а-яёА-ЯЁ\-\s]/g, '');
				}
			});
		});
	});

	// Дополнительная проверка для select в калькуляторе
	const calcSelect = document.querySelector('.calc-type');
	if (calcSelect) {
		// При изменении select, проверяем что выбранное значение отображается корректно
		calcSelect.addEventListener('change', (e) => {
			// Ничего не делаем, просто позволяем событию произойти
			// Браузер сам отобразит выбранное значение
			console.log('Выбрано значение:', e.target.value);
		});
	}
};

export default validator;
