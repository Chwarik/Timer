(function () {
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


	/* second.addEventListener('wheel', function(e) {
		let value = Number(e.target.innerText);
		let delta = e.deltaY;

		if (delta < 0 && value == 60) {
			value = '00';
			minute.innerText = Number(minute.innerText) + 1;
		};
	}) */

	let timeLimit = (el, max) => {
		el.onwheel = (e) => {
			let value = Number(e.target.innerText);
			let delta = e.deltaY;

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
					console.log(typeof sec);
				}
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
			}

			if (value < 10) {
				e.target.innerText = '0' + value;
			} else {
				e.target.innerText = value;
			}
		};
	};

	let secToMin = (sec, min) => {
		min = min + 1;
		sec = '00';
	};


	timeLimit(hour, 24);
	timeLimit(minute, 60);
	timeLimit(second, 60);


	// Обработка кнопок
	btnPlay.addEventListener('click', () => {
		clearInterval(interval);
		// startTimer();
		interval = setInterval(startTimer, 100);
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
	});


	function startTimer() {
		// Секунды
		if (sec < 9) {
			second.innerText = '0' + sec;
		};
		if (sec > 9) {
			second.innerText = sec;
		};

		if (sec > 59) {
			// min++
			minute.innerText = '0' + min;
			sec = 0;
			second.innerText = '0' + sec;
		};

		// Минуты
		if (min < 9) {
			minute.innerText = '0' + min;
		};
		if (min > 9) {
			minute.innerText = min;
		};

		if (min > 59) {
			// hour++;
			hour.innerText = '0' + h;
			min = 0;
			minute.innerText = '0' + min;
		};

		// Часы
		if (h < 9) {
			hour.innerText = '0' + h;
		};
		if (h > 9) {
			hour.innerText = h;
		};

		// Обратный отсчет
		/* if (h > 0) {
			if (min > 0) {
				if (sec > 0) {
					sec--;
				};
			};
		} else {
			if (min > 0) {

			}
		}; */

		if ((h > 0 && sec > 0) || (min > 0 && sec > 0)) {
			if (h > 0 && min == 1) {
				h = h - 1;
				min = 60;
			};
			if (min > 0 && sec == 1) {
				min = min - 1;
				sec = 60;
			};
			sec--;
			console.log(sec);
		};
	};



}());