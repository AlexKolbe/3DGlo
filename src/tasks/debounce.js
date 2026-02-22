(function() {
    'use strict';
    
    // Элементы DOM
    const textInput = document.getElementById('textInput');
    const outputText = document.getElementById('outputText');
    const statusEl = document.getElementById('status');
    const timerEl = document.getElementById('timer');
    
    // Параметры
    const DELAY_MS = 300;
    let timeoutId = null;
    let timerStart = null;
    let timerInterval = null;
    
    // Обновление отображаемого текста
    function updateOutput(text) {
        const trimmed = text.trim();
        
        if (trimmed === '') {
            outputText.textContent = 'Здесь будет отображаться ваш текст...';
            outputText.classList.add('empty');
        } else {
            outputText.textContent = trimmed;
            outputText.classList.remove('empty');
        }
    }
    
    // Обновление статуса
    function updateStatus(message, isActive = false) {
        statusEl.textContent = message;
        statusEl.style.color = isActive ? '#667eea' : '#666';
    }
    
    // Обновление таймера
    function updateTimer(remaining) {
        timerEl.textContent = Math.max(0, Math.floor(remaining));
    }
    
    // Сброс таймера
    function resetTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        updateTimer(0);
    }
    
    // Запуск таймера обратного отсчета
    function startCountdown(duration) {
        resetTimer();
        timerStart = Date.now();
        
        updateTimer(duration);
        
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - timerStart;
            const remaining = duration - elapsed;
            
            if (remaining <= 0) {
                resetTimer();
                updateTimer(0);
            } else {
                updateTimer(remaining);
            }
        }, 10); // обновляем каждые 10 мс для плавности
    }
    
    // Функция debounce
    function debounceUpdate(value) {
        // Сбрасываем предыдущий таймаут
        if (timeoutId) {
            clearTimeout(timeoutId);
            updateStatus('Таймер сброшен, перезапуск...', true);
        }
        
        // Запускаем новый таймаут
        updateStatus('Таймер запущен...', true);
        startCountdown(DELAY_MS);
        
        timeoutId = setTimeout(() => {
            updateOutput(value);
            updateStatus('Текст обновлён!', false);
            resetTimer();
            timeoutId = null;
        }, DELAY_MS);
    }
    
    // Обработчик ввода
    function handleInput(event) {
        const value = event.target.value;
        debounceUpdate(value);
    }
    
    // Обработчик очистки поля
    function handleClear() {
        if (textInput.value === '') {
            debounceUpdate('');
        }
    }
    
    // Инициализация
    function init() {
        textInput.addEventListener('input', handleInput);
        textInput.addEventListener('blur', handleClear);
        textInput.focus();
        
        updateStatus('Ожидание ввода...', false);
        resetTimer();
    }
    
    // Запуск при полной загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();