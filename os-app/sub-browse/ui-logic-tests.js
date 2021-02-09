const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('EMLBrowseSort', function test_EMLBrowseSort() {

	const item1 = {
		EMLMemoEventDate: new Date(0),
	};
	const item2 = {
		EMLMemoEventDate: new Date(1),
	};

	it('sorts by EMLMemoEventDate descending', function () {
		deepEqual([item1, item2].sort(mod.EMLBrowseSort), [item2, item1]);
	});

});

describe('EMLBrowseFilterFunction', function test_EMLBrowseFilterFunction() {

	it('throws error if not string', function () {
		throws(function () {
			mod.EMLBrowseFilterFunction(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mod.EMLBrowseFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		context('EMLMemoNotes', function () {

			it('returns false if not OLSKStringMatch', function () {
				deepEqual(mod.EMLBrowseFilterFunction('alfa')(StubMemoObjectValid({
					EMLMemoNotes: 'bravo',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mod.EMLBrowseFilterFunction('alf')(StubMemoObjectValid({
					EMLMemoNotes: 'álfa',
				})), true);
			});

		});

	});

});

describe('EMLBrowseExactMatchFirst', function test_EMLBrowseExactMatchFirst() {

	it('throws error if param1 not string', function () {
		throws(function () {
			mod.EMLBrowseExactMatchFirst(null, []);
		}, /EMLErrorInputNotValid/);
	});

	it('throws error if param2 not array', function () {
		throws(function () {
			mod.EMLBrowseExactMatchFirst('', null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.EMLBrowseExactMatchFirst('alfa', []), []);
	});

	it('creates copy', function () {
		const item = [];
		deepEqual(mod.EMLBrowseExactMatchFirst('alfa', item) !== item, true);
	});

	context('EMLMemoNotes', function () {

		it('orders exact OLSKStringMatch first', function () {
			const items = [StubMemoObjectValid({
				EMLMemoNotes: 'álfa',
			}), StubMemoObjectValid({
				EMLMemoNotes: 'álf',
			})];
			deepEqual(mod.EMLBrowseExactMatchFirst('alf', items), items.reverse());
		});

	});

});
