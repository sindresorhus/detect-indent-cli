import childProcess from 'child_process';
import test from 'ava';

test('main', t => {
	t.plan(2);

	childProcess.execFile('./cli.js', ['fixture.js'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.is(stdout, '  ');
	});
});

test('stdin', t => {
	t.plan(2);

	childProcess.exec('cat fixture.js | ./cli.js', {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.is(stdout, '  ');
	});
});
