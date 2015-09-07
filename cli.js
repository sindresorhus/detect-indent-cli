#!/usr/bin/env node
'use strict';
var fs = require('fs');
var meow = require('meow');
var stdin = require('get-stdin');
var detectIndent = require('detect-indent');

var cli = meow({
	help: [
		'  Usage',
		'    $ detect-indent <file>',
		'    echo <string> | detect-indent',
		'',
		'  Example',
		'    $ echo \'  foo\\n  bar\' | detect-indent | wc --chars',
		'    2'
	]
});

function init(data) {
	var indent = detectIndent(data).indent;

	if (indent !== null) {
		process.stdout.write(indent);
	} else {
		console.error('Indentation could not be detected');
		process.exit(2);
	}
}

var input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Expected a filepath');
	process.exit(1);
	return;
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	stdin().then(init);
}
