import test from 'ava';
import execa from 'execa';

test('main', async t => {
	t.is((await execa('./cli.js', ['fixture.js'])).stdout, '  ');
});

test('stdin', async t => {
	t.is((await execa.shell('cat fixture.js | ./cli.js')).stdout, '  ');
});
