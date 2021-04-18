'use strict';

const OPERATORS = ['*', '/', '+', '-'];
const OVERWRITABLE_OPERATORS = ['*', '/', '+'];

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('keydown', (e) => {
		takeKeyInput(e.key);
	});

	document.querySelectorAll('.calc-btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			if (btn.id === 'multiply') {
				takeKeyInput('*');
			}
			else if (btn.id === 'divide') {
				takeKeyInput('/')
			}
			else if (btn.id === 'subtract') {
				takeKeyInput('-')
			}
			else if (btn.id === 'add') {
				takeKeyInput('+')
			}
			else if (btn.id === 'equals') {
				takeKeyInput('=')
			}
		});
	});

	document.querySelectorAll('.control-btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			if (btn.id === 'clear') {
				takeKeyInput('Escape');
			}
			else if (btn.id === 'cancel') {
				takeKeyInput('Backspace');
			}
		});
	});

	document.querySelectorAll('.numeric-btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			if (btn.id === 'decimal') {
				takeKeyInput('.');
			}
			else {
				takeKeyInput(btn.getAttribute('data-value'));
			}
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
		if (!display.textContent.includes('.')) {
			if (formulaScreen.textContent === '') {
				formulaScreen.textContent = '0';
			}
			display.textContent += '.';
			formulaScreen.textContent += '.';
		}
	}
	else if (key === 'Escape') {
		display.textContent = '0';
		formulaScreen.textContent = '';
	}
	else if (key === 'Backspace') {
		if (display.textContent.length === 1) {
			display.textContent = '0';
			formulaScreen.textContent = '';
		}
		else {
			display.textContent = display.textContent.slice(0, display.textContent.length - 1)
			formulaScreen.textContent = formulaScreen.textContent.slice(0, formulaScreen.textContent.length - 1)
		}
	}
	else if (OPERATORS.includes(key)) {
		handleOperatorKeys(key, display, formulaScreen)
	}
	else if (key === '=') {
		formulaScreen.setAttribute('data-calculated', true);
		const result = eval(formulaScreen.textContent)
		formulaScreen.textContent += '=' + result;
		display.textContent = result;
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
