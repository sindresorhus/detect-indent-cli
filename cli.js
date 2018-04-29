#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const stdin = require('get-stdin');
const detectIndent = require('detect-indent');

const cli = meow(`
	Usage
	  $ detect-indent <file>
	  echo <string> | detect-indent

	Example
	  $ echo '  foo\\n  bar' | detect-indent | wc --chars
	  2
`);

function init(data) {
	const {indent} = detectIndent(data);

	if (indent === null) {
		console.error('Indentation could not be detected');
		process.exit(2);
	} else {
		process.stdout.write(indent);
	}
}

const [input] = cli.input;

if (!input && process.stdin.isTTY) {
	console.error('Specify a filepath');
	process.exit(1);
} else if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	(async () => {
		init(await stdin());
	})();
}
