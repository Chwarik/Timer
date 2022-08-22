"use strict";

(function () {
  var time = document.querySelectorAll('.time');
  var hour = document.querySelector('.hour');
  var minute = document.querySelector('.minute');
  var second = document.querySelector('.second');
  var btnStop = document.querySelector('.btnStop');
  var btnPlay = document.querySelector('.btnPlay');
  var btnPause = document.querySelector('.btnPause');
  var sound = document.getElementById('sound');
  var h = 0;
  var min = 0;
  var sec = 0;
  var interval;

  var timeLimit = function timeLimit(el, max) {
    el.onwheel = function (e) {
      var value = Number(e.target.innerText);
      var delta = e.deltaY; // Прокрутка вперёд

      if (delta < 0 && value < max) {
        value = value + 1;

        if (el === second) {
          if (value == max) {
            min = min + 1;
            value = 0;
            minute.innerText = min;

            if (min == max) {
              h = h + 1;
              min = 0;

              if (Number(hour.innerText) < 9) {
                hour.innerText = '0' + h;
              } else {
                hour.innerText = h;
              }

              minute.innerText = '';
            }

            if (Number(minute.innerText) < 10) {
              minute.innerText = '0' + min;
            } else {
              minute.innerText = min;
            }
          }

          sec = value;
        }

        ;

        if (el === minute) {
          if (value == max) {
            value = 0;
            h = h + 1;
            hour.innerText = h;

            if (hour.innerText < 10) {
              hour.innerText = '0' + h;
            } else {
              hour.innerText = h;
            }
          }

          min = value;
        }

        if (el === hour) {
          h = value;
        }
      } else if (delta > 0 && value >= 0) {
        if (value > 0) {
          value = value - 1;
        } // Прокрутка назад


        if (el === hour) {
          h = value;
        }

        if (el === minute) {
          if (h > 0) {
            if (value == 0) {
              value = max;
              h = h - 1;
              hour.innerText = h;

              if (Number(hour.innerText) <= 9) {
                hour.innerText = '0' + h;
              }
            }
          }

          min = value;
        }

        if (el === second) {
          if (min > 0 || h > 0) {
            if (value == 0) {
              value = max;

              if (min > 0) {
                min = min - 1;

                if (Number(minute.innerText) < 10) {
                  minute.innerText = '0' + min;
                } else {
                  minute.innerText = min;
                }
              }

              if (min == 0 && h > 0) {
                h = h - 1;
                sec = max;
                min = max - 1;
                minute.innerHTML = min;

                if (Number(hour.innerText) < 10) {
                  hour.innerText = '0' + h;
                } else {
                  hour.innerText = h;
                }
              }
            }
          }

          sec = value;
        }
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
  timeLimit(second, 60); // Обработка кнопок

  btnPlay.addEventListener('click', function () {
    clearInterval(interval);
    interval = setInterval(startTimer, 1000);
    time.forEach(function (time) {
      time.classList.add('active');
    });
  });
  btnPause.addEventListener('click', function () {
    clearInterval(interval);
  });
  btnStop.addEventListener('click', function () {
    clearInterval(interval);
    h = 0;
    min = 0;
    sec = 0;
    second.textContent = '00';
    minute.textContent = '00';
    hour.textContent = '00';
    time.forEach(function (time) {
      time.classList.remove('active');
    });
    sound.loop = false;
    sound.pause();
    sound.currentTime = 0;
  });

  function startTimer() {
    // Обратный отсчет
    if (h > 0 && sec >= 0 || min > 0 && sec >= 0 || sec > 0) {
      if (sec == 0) {
        if (min > 0) {
          min = min - 1;
          sec = 60;
        } else if (min == 0) {
          if (h > 0) {
            h = h - 1;
            min = 59;
            sec = 60;
          }

          ;
        }

        ;
      }

      ;
      sec--;
    }

    ; // Секунды

    if (sec <= 9) {
      second.innerText = '0' + sec;
    } else if (sec > 9) {
      second.innerText = sec;
    }

    ;

    if (sec > 59) {
      minute.innerText = '0' + min;
      sec = 0;
      second.innerText = '0' + sec;
    }

    ; // Минуты

    if (min <= 9) {
      minute.innerText = '0' + min;
    } else if (min > 9) {
      minute.innerText = min;
    }

    ;

    if (min > 59) {
      hour.innerText = '0' + h;
      min = 0;
      minute.innerText = '0' + min;
    }

    ; // Часы

    if (h <= 9) {
      hour.innerText = '0' + h;
    } else if (h > 9) {
      hour.innerText = h;
    }

    ;

    if (h == 0 && min == 0 && sec == 0) {
      clearInterval(interval);
      sound.loop = true;
      sound.play();
      setTimeout(function () {
        sound.loop = false;
        time.forEach(function (time) {
          time.classList.remove('active');
        });
      }, 60000);
    }

    ;
  }

  ;
})();
//# sourceMappingURL=timer.js.map