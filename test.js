import fs from 'node:fs';
import test from 'ava';
import execa from 'execa';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['fixture']);
	t.is(stdout, '  ');
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {
		input: fs.readFileSync('fixture'),
	});

	t.is(stdout, '  ');
});

test('verbose flag with spaces', async t => {
	const {stdout} = await execa('./cli.js', ['--verbose'], {
		input: '  foo\n  bar',
	});
	t.is(stdout, 'Type: space\nAmount: 2');
});

test('verbose flag with tabs', async t => {
	const {stdout} = await execa('./cli.js', ['--verbose'], {
		input: '\tfoo\n\tbar',
	});
	t.is(stdout, 'Type: tab\nAmount: 1');
});

test('verbose flag with file argument', async t => {
	const {stdout} = await execa('./cli.js', ['fixture', '--verbose']);
	t.is(stdout, 'Type: space\nAmount: 2');
});

test('verbose flag with mixed indentation', async t => {
	const {stdout} = await execa('./cli.js', ['--verbose'], {
		input: '\t\tfoo\n\t\tbar\n\t\tbaz',
	});
	t.is(stdout, 'Type: tab\nAmount: 2');
});

test('verbose flag with 4 spaces', async t => {
	const {stdout} = await execa('./cli.js', ['--verbose'], {
		input: '    foo\n    bar',
	});
	t.is(stdout, 'Type: space\nAmount: 4');
});

test('verbose flag with no indentation', async t => {
	const {stdout} = await execa('./cli.js', ['--verbose'], {
		input: 'foo\nbar\nbaz',
	});
	t.is(stdout, 'Type: unknown\nAmount: 0');
});
