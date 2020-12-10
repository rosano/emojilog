const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('EMTBrowseSort', function test_EMTBrowseSort() {

	const item1 = {
		EMTMemoEventDate: new Date(0),
	};
	const item2 = {
		EMTMemoEventDate: new Date(1),
	};

	it('sorts by EMTMemoEventDate descending', function () {
		deepEqual([item1, item2].sort(mod.EMTBrowseSort), [item2, item1]);
	});

});

describe('EMTBrowseFilterFunction', function test_EMTBrowseFilterFunction() {

	it('throws error if not string', function () {
		throws(function () {
			mod.EMTBrowseFilterFunction(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mod.EMTBrowseFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		context('EMTMemoNotes', function () {

			it('returns false if not OLSKStringMatch', function () {
				deepEqual(mod.EMTBrowseFilterFunction('alfa')(StubMemoObjectValid({
					EMTMemoNotes: 'bravo',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mod.EMTBrowseFilterFunction('alf')(StubMemoObjectValid({
					EMTMemoNotes: 'álfa',
				})), true);
			});

		});

	});

});

describe('EMTBrowseExactMatchFirst', function test_EMTBrowseExactMatchFirst() {

	it('throws error if param1 not string', function () {
		throws(function () {
			mod.EMTBrowseExactMatchFirst(null, []);
		}, /EMTErrorInputNotValid/);
	});

	it('throws error if param2 not array', function () {
		throws(function () {
			mod.EMTBrowseExactMatchFirst('', null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.EMTBrowseExactMatchFirst('alfa', []), []);
	});

	it('creates copy', function () {
		const item = [];
		deepEqual(mod.EMTBrowseExactMatchFirst('alfa', item) !== item, true);
	});

	context('EMTMemoNotes', function () {

		it('orders exact OLSKStringMatch first', function () {
			const items = [StubMemoObjectValid({
				EMTMemoNotes: 'álfa',
			}), StubMemoObjectValid({
				EMTMemoNotes: 'álf',
			})];
			deepEqual(mod.EMTBrowseExactMatchFirst('alf', items), items.reverse());
		});

	});

});
