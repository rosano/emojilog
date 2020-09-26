const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

describe('EMTBrowseSort', function test_EMTBrowseSort() {

	const item1 = {
		EMTMemoEventDate: new Date(0),
	};
	const item2 = {
		EMTMemoEventDate: new Date(1),
	};

	it('sorts by EMTMemoEventDate descending', function () {
		deepEqual([item1, item2].sort(mainModule.EMTBrowseSort), [item2, item1]);
	});

});
