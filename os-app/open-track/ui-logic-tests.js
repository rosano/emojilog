const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('EMTTrackSort', function test_EMTTrackSort() {

	it('sorts by EMTJournalModificationDate descending', function() {
		let item1 = {
			EMTJournalModificationDate: new Date(0),
		};
		let item2 = {
			EMTJournalModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMTTrackSort), [item2, item1]);
	});

	it('sorts by EMTJournalCreationDate descending if no EMTJournalModificationDate', function() {
		let item1 = {
			EMTJournalCreationDate: new Date(0),
		};
		let item2 = {
			EMTJournalCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMTTrackSort), [item2, item1]);
	});

});
