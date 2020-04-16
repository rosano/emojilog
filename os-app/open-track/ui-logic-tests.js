const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('EMTTrackSort', function test_EMTTrackSort() {

	it('sorts by EMTDocumentModificationDate descending', function() {
		let item1 = {
			EMTDocumentModificationDate: new Date(0),
		};
		let item2 = {
			EMTDocumentModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.EMTTrackSort), [item2, item1]);
	});

	it('sorts by EMTDocumentCreationDate descending if no EMTDocumentModificationDate', function() {
		let item1 = {
			EMTDocumentCreationDate: new Date(0),
		};
		let item2 = {
			EMTDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.EMTTrackSort), [item2, item1]);
	});

});
