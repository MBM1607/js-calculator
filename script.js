'use strict';

document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('keydown', function(e) {
		takeKeyInput(e.key);
	});

	document.querySelectorAll('.calc-btn').forEach(function (btn) {
		btn.addEventListener('click', function () {
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

	document.querySelectorAll('.control-btn').forEach(function(btn) {
		btn.addEventListener('click', function() {
			if (btn.id === 'clear') {
				takeKeyInput('Escape');
			}
			else if (btn.id === 'cancel') {
				takeKeyInput('Backspace');
			}
		});
	});

	document.querySelectorAll('.numeric-btn').forEach(function(btn) {
		btn.addEventListener('click', function() {
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
	console.log(key);
	var display = document.getElementById('display');
	var formulaScreen = document.getElementById('formula-screen');

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
	else if (['*', '/', '+', '-'].includes(key)) {
		formulaScreen.textContent += key
		display.textContent = key;
	}
	else if (key === '=') {
		var result = eval(formulaScreen.textContent)
		formulaScreen.textContent += '=' + result;
		display.textContent = result;
	}
}

function handleNumericKeys(num, display, formulaScreen) {
	if (display.textContent === '0') {
		formulaScreen.textContent = num;
		display.textContent = num;
	}
	else {
		formulaScreen.textContent += num;
		display.textContent += num;
	}
}
