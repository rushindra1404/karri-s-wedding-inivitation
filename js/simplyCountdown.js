(function (exports) {
    'use strict';

    var extend, createElements, createCountdownElt, simplyCountdown;

    extend = function (out) {
        var i, obj, key;
        out = out || {};
        for (i = 1; i < arguments.length; i++) {
            obj = arguments[i];
            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }
        return out;
    };

    createCountdownElt = function (countdown, parameters, typeClass) {
        var sectionTag = document.createElement('div'),
            amountTag = document.createElement('span'),
            wordTag = document.createElement('span'),
            innerSectionTag = document.createElement('div');

        innerSectionTag.appendChild(amountTag);
        innerSectionTag.appendChild(wordTag);
        sectionTag.appendChild(innerSectionTag);

        sectionTag.classList.add(parameters.sectionClass, typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag
        };
    };

    createElements = function (parameters, countdown) {
        return {
            days: createCountdownElt(countdown, parameters, 'simply-days-section'),
            hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
            minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
            seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
        };
    };

    simplyCountdown = function (elt, args) {
        var parameters = extend({
                year: 2025,
                month: 1,
                day: 1,
                hours: 0,
                minutes: 0,
                seconds: 0,
                refresh: 1000,
                zeroPad: true
            }, args),
            interval, targetDate;

        targetDate = new Date(
            parameters.year, parameters.month - 1, parameters.day,
            parameters.hours, parameters.minutes, parameters.seconds
        );

        document.querySelectorAll(elt).forEach(function (countdown) {
            var fullCountDown = createElements(parameters, countdown);

            function animateChange(element, value) {
                element.classList.add('countdown-change');
                setTimeout(() => {
                    element.textContent = value;
                    element.classList.remove('countdown-change');
                }, 500);
            }

            function refresh() {
                var now = new Date(),
                    secondsLeft = (targetDate - now) / 1000,
                    days, hours, minutes, seconds;

                if (secondsLeft > 0) {
                    days = Math.floor(secondsLeft / 86400);
                    secondsLeft %= 86400;
                    hours = Math.floor(secondsLeft / 3600);
                    secondsLeft %= 3600;
                    minutes = Math.floor(secondsLeft / 60);
                    seconds = Math.floor(secondsLeft % 60);
                } else {
                    days = hours = minutes = seconds = 0;
                    clearInterval(interval);
                }

                animateChange(fullCountDown.days.amount, days);
                animateChange(fullCountDown.hours.amount, hours);
                animateChange(fullCountDown.minutes.amount, minutes);
                animateChange(fullCountDown.seconds.amount, seconds);
            }

            refresh();
            interval = setInterval(refresh, parameters.refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

/* CSS for animation */
const style = document.createElement('style');
style.innerHTML = `
    .countdown-change {
        animation: fadeBounce 0.5s ease-in-out;
    }
    @keyframes fadeBounce {
        0% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
