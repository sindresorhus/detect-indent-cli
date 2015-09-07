'use strict';
var test = require('ava');
var childProcess = require('child_process');

test('main', function (t) {
	t.plan(2);

	childProcess.execFile('./cli.js', ['fixture.js'], {
		cwd: __dirname
	}, function (err, stdout) {
		t.error(err);
		t.is(stdout, '  ');
	});
});

test('stdin', function (t) {
	t.plan(2);

	childProcess.exec('cat fixture.js | ./cli.js', {
		cwd: __dirname
	}, function (err, stdout) {
		t.error(err);
		t.is(stdout, '  ');
	});
});
