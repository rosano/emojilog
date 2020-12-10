const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('EMTBrowseListItemAccessibilitySummary', function test_EMTBrowseListItemAccessibilitySummary() {

	const item = {
		EMTMemoID: 'alfa',
	};

	it('throws if not object', function () {
		throws(function () {
			mod.EMTBrowseListItemAccessibilitySummary(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns EMTBrowseListItemUntitledText', function () {
		deepEqual(mod.EMTBrowseListItemAccessibilitySummary(Object.assign(item), function (inputData) {
			return inputData;
		}), 'EMTBrowseListItemUntitledText');
	});

});
