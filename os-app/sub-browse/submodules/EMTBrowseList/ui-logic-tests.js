const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('EMTBrowseListItemAccessibilitySummary', function test_EMTBrowseListItemAccessibilitySummary() {

	const item = {
		EMTMemoID: 'alfa',
	};

	it('throws if not object', function () {
		throws(function () {
			mainModule.EMTBrowseListItemAccessibilitySummary(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns EMTBrowseListItemUntitledText', function () {
		deepEqual(mainModule.EMTBrowseListItemAccessibilitySummary(Object.assign(item), function (inputData) {
			return inputData;
		}), 'EMTBrowseListItemUntitledText');
	});

});
