(function () {
	// let time = document.querySelectorAll('.time'); и forEach
	let hour = document.querySelector('.hour');
	let minute = document.querySelector('.minute');
	let second = document.querySelector('.second');
	let btnStop = document.querySelector('.btnStop');
	let btnPlay = document.querySelector('.btnPlay');
	let btnPause = document.querySelector('.btnPause');

	let h = 0;
	let min = 0;
	let sec = 0;
	let interval;

	let timeLimit = (el, max) => {
		el.onwheel = (e) => {
			let value = Number(e.target.innerText);
			let delta = e.deltaY;
			// Прокрутка вперёд
			if (delta < 0 && value < max) {
				value = value + 1;
				if (el === second) {
					if (value == 60) {
						value = '0';
						minute.innerText = Number(minute.innerText) + 1;

						if (minute.innerText < 10) {
							minute.innerText = '0' + minute.innerText;
						} else {
							minute.innerText = minute.innerText;
						}
					}
					sec = value;
				};

				if (el === minute) {
					if (value == 60) {
						value = '0';
						hour.innerText = Number(hour.innerText) + 1;

						if (hour.innerText < 10) {
							hour.innerText = '0' + hour.innerText;
						} else {
							hour.innerText = hour.innerText;
						}
					}
					min = value;
				}

				if (el === hour) {
					h = value;
				}
			} else if (value > 0) {
				value = value - 1;
				// Сделать прокрутку назад
			}

			if (value < 10) {
				e.target.innerText = '0' + value;
			} else {
				e.target.innerText = value;
			}
		};
	};

	timeLimit(hour, 24);
	timeLimit(minute, 60);
	timeLimit(second, 60);


	// Обработка кнопок
	btnPlay.addEventListener('click', () => {
		clearInterval(interval);
		interval = setInterval(startTimer, 1000);
		hour.classList.add('active');
		minute.classList.add('active');
		second.classList.add('active');
	});

	btnPause.addEventListener('click', () => {
		clearInterval(interval);
	});

	btnStop.addEventListener('click', () => {
		clearInterval(interval);
		h = 0;
		min = 0;
		sec = 0;
		second.textContent = '00';
		minute.textContent = '00';
		hour.textContent = '00';
		hour.classList.remove('active');
		minute.classList.remove('active');
		second.classList.remove('active');
	});

	function startTimer() {
		// Обратный отсчет
		if ((h > 0 && sec >= 0) || (min > 0 && sec >= 0) || sec > 0) {
			if (h > 0 && min == 0) {
				h = h - 1;
				min = 60;
			};

			if (min > 0 && sec == 0) {
				min = min - 1;
				sec = 60;
			};
			sec--;
		};

		// Секунды
		if (sec <= 9) {
			second.innerText = '0' + sec;
		} else if (sec > 9) {
			second.innerText = sec;
		};

		if (sec > 59) {
			minute.innerText = '0' + min;
			sec = 0;
			second.innerText = '0' + sec;
		};

		// Минуты
		if (min <= 9) {
			minute.innerText = '0' + min;
		} else if (min > 9) {
			minute.innerText = min;
		};

		if (min > 59) {
			hour.innerText = '0' + h;
			min = 0;
			minute.innerText = '0' + min;
		};

		// Часы
		if (h <= 9) {
			hour.innerText = '0' + h;
		} else if (h > 9) {
			hour.innerText = h;
		};
	};
}());