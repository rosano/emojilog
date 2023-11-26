const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('EMLBrowseAccessibilitySummary', function test_EMLBrowseAccessibilitySummary() {

	it('throws if not object', function () {
		throws(function () {
			mod.EMLBrowseAccessibilitySummary(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns string', function() {
		const EMLMemoEventDate = new Date();
		deepEqual(mod.EMLBrowseAccessibilitySummary(StubMemoObjectValid({
			EMLMemoEventDate,
		})), EMLMemoEventDate.toLocaleString());
	});

});

describe('EMLBrowseSortFunction', function test_EMLBrowseSortFunction() {
	
	it('sorts by EMLMemoEventDate descending', function() {
		const item1 = {
			EMLMemoEventDate: new Date(0),
		};
		const item2 = {
			EMLMemoEventDate: new Date(1),
		};
		deepEqual([item1, item2].sort(mod.EMLBrowseSortFunction), [item2, item1]);
	});

});

describe('EMLBrowseIsMatch', function test_EMLBrowseIsMatch() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.EMLBrowseIsMatch({}, null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		deepEqual(mod.EMLBrowseIsMatch({
			EMLMemoNotes: 'alfa',
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.EMLBrowseIsMatch({
			EMLMemoNotes: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

	context('custom field', function () {

		it('returns false if no match', function() {
			deepEqual(mod.EMLBrowseIsMatch({
				EMLMemoCustomData: {
					[Math.random().toString()]: Math.random().toString(),
				},
			}, Math.random().toString()), false);
		});

		it('matches OLSKStringMatch', function() {
			deepEqual(mod.EMLBrowseIsMatch({
				EMLMemoCustomData: {
					[Math.random().toString()]: uRandomElement('alfa', 'álfa'),
				},
			}, uRandomElement('alf', 'alfa', 'ALF')), true);
		});
	
	});

});

describe('EMLBrowseExactSortFunction', function test_EMLBrowseExactSortFunction() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod.EMLBrowseExactSortFunction(null, Math.random().toString(), Math.random().toString());
		}, /EMLErrorInputNotValid/);
	});

	it('returns 0', function() {
		deepEqual(mod.EMLBrowseExactSortFunction(Math.random().toString(), {}, {}), 0);
	});

});
