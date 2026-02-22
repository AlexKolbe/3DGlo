const modal = () => {
	console.log('modal.js');
	const buttons = document.querySelector('.popup-btn');
	const modal = document.querySelector('.popup');
	const closeBtn = modal.querySelector('.popup-close');

	buttons.forEach(btn => {
		btn.addEventListener('click', () => {
			modal.style.display = 'block';
		})
	})

	closeBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			modal.style.display = 'none';
		})
	})

}

export default modal
