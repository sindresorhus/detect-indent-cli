#!/usr/bin/env node
import fs from 'node:fs';
import process from 'node:process';
import meow from 'meow';
import stdin from 'get-stdin';
import detectIndent from 'detect-indent';

const cli = meow(`
	Usage
	  $ detect-indent <file>
	  echo <string> | detect-indent

	Options
	  --verbose  Show indent type and amount

	Example
	  $ echo '  foo\\n  bar' | detect-indent | wc --chars
	  2

	  $ echo '  foo\\n  bar' | detect-indent --verbose
	  Type: space
	  Amount: 2
`, {
	importMeta: import.meta,
	flags: {
		verbose: {
			type: 'boolean',
		},
	},
});

function init(data) {
	const {indent, type, amount} = detectIndent(data);

	if (indent === undefined) {
		console.error('Indentation could not be detected');
		process.exitCode = 2;
	} else if (cli.flags.verbose) {
		console.log(`Type: ${type || 'unknown'}`);
		console.log(`Amount: ${amount}`);
	} else {
		process.stdout.write(indent);
	}
}

const [input] = cli.input;

if (!input && process.stdin.isTTY) {
	console.error('Specify a filepath');
	process.exitCode = 1;
} else if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	(async () => {
		init(await stdin());
	})();
}
