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

describe('EMLBrowseFilterFunction', function test_EMLBrowseFilterFunction() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.EMLBrowseFilterFunction({}, null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		deepEqual(mod.EMLBrowseFilterFunction({
			EMLMemoNotes: 'alfa',
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.EMLBrowseFilterFunction({
			EMLMemoNotes: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('EMLBrowseExactFunction', function test_EMLBrowseExactFunction() {

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.EMLBrowseExactFunction({}, null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns false if not starting with input', function() {
		const item = Math.random().toString();
		deepEqual(mod.EMLBrowseExactFunction({
			EMLMemoNotes: Math.random().toString() + item,
		}, item), false);
	});

	it('returns true', function() {
		const item = Math.random().toString();
		deepEqual(mod.EMLBrowseExactFunction({
			EMLMemoNotes: item + Math.random().toString(),
		}, item), true);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.EMLBrowseExactFunction({
			EMLMemoNotes: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});
