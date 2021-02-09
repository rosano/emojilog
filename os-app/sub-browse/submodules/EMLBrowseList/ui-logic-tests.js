const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('EMLBrowseListItemAccessibilitySummary', function test_EMLBrowseListItemAccessibilitySummary() {

	const item = {
		EMLMemoID: 'alfa',
	};

	it('throws if not object', function () {
		throws(function () {
			mod.EMLBrowseListItemAccessibilitySummary(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns EMLBrowseListItemUntitledText', function () {
		deepEqual(mod.EMLBrowseListItemAccessibilitySummary(Object.assign(item), function (inputData) {
			return inputData;
		}), 'EMLBrowseListItemUntitledText');
	});

});
