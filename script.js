'use strict';

const OPERATORS = ['*', '/', '+', '-'];
const OVERWRITABLE_OPERATORS = ['*', '/', '+'];

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('keydown', (e) => {
		document.querySelector(`kbd[data-key="${e.key}"]`)?.click();
	});

	document.querySelectorAll('.btn').forEach(btn => {
		btn.addEventListener('click', () => {
			if (!btn.classList.contains('pressed')) {
				btn.classList.add('pressed');
				setTimeout(() => {
					btn.classList.remove('pressed');
				}, 200);
			}
			takeKeyInput(btn.getAttribute('data-key'));
		});

	});
})

function is_numeric(str) {
	return /^\d$/.test(str);
}

function takeKeyInput(key) {
	const display = document.getElementById('display');
	const formulaScreen = document.getElementById('formula-screen');

	if (is_numeric(key)) {
		handleNumericKeys(key, display, formulaScreen);
	}
	else if (key === '.') {
		handleDecimalKey(display, formulaScreen);
	}
	else if (key === 'Escape') {
		clearDisplay(display, formulaScreen);
	}
	else if (key === 'Backspace') {
		removeKey(display, formulaScreen);
	}
	else if (OPERATORS.includes(key)) {
		handleOperatorKeys(key, display, formulaScreen);
	}
	else if (key === '=' || key === 'Enter') {
		calculate(display, formulaScreen);
	}
}

function handleNumericKeys(num, display, formulaScreen) {

	if (formulaScreen.getAttribute('data-calculated') === 'true'
		|| display.textContent === '0') {
		formulaScreen.setAttribute('data-calculated', false);
		formulaScreen.textContent = num;
		display.textContent = num;
	}
	else if (OPERATORS.includes(display.textContent)) {
		formulaScreen.textContent += num;
		display.textContent = num;
	}
	else {
		formulaScreen.textContent += num;
		display.textContent += num;
	}
}

function handleDecimalKey(display, formulaScreen) {
	if (!display.textContent.includes('.')) {
		if (formulaScreen.textContent === '') {
			formulaScreen.textContent = '0';
		}
		display.textContent += '.';
		formulaScreen.textContent += '.';
	}
}

function handleOperatorKeys(key, display, formulaScreen) {

	/* If equal result is currently displayed overwrite that and show result value in screens  */
	if (formulaScreen.getAttribute('data-calculated') === 'true') {
		formulaScreen.setAttribute('data-calculated', false);
		formulaScreen.textContent = formulaScreen.textContent.split('=')[1];
		display.textContent = formulaScreen.textContent;
	}

	/* Handle when two or more consecutive operators are entered */
	if (OVERWRITABLE_OPERATORS.includes(key)) {
		for (let i = formulaScreen.textContent.length - 1; i >= 0; i--) {
			if (OPERATORS.includes(formulaScreen.textContent[i])) {
				formulaScreen.textContent = formulaScreen.textContent.slice(0, -1);
			}
			else {
				break
			}
		};
	}

	formulaScreen.textContent += key;
	display.textContent = key;
}

function calculate(display, formulaScreen) {
	formulaScreen.setAttribute('data-calculated', true);
	const result = eval(formulaScreen.textContent)
	formulaScreen.textContent += '=' + result;
	display.textContent = result;
}

function removeKey(display, formulaScreen) {
	if (display.textContent.length <= 1) {
		clearDisplay(display, formulaScreen)
	}
	else {
		display.textContent = display.textContent.slice(0, display.textContent.length - 1);
		formulaScreen.textContent = formulaScreen.textContent.slice(0, formulaScreen.textContent.length - 1);
	}
}

function clearDisplay(display, formulaScreen) {
	display.textContent = '0';
	formulaScreen.textContent = '';
}
