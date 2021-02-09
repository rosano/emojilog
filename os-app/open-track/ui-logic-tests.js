const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('EMLTrackSort', function test_EMLTrackSort() {

	it('sorts by EMLJournalModificationDate descending', function() {
		let item1 = {
			EMLJournalModificationDate: new Date(0),
		};
		let item2 = {
			EMLJournalModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackSort), [item2, item1]);
	});

	it('sorts by EMLJournalCreationDate descending if no EMLJournalModificationDate', function() {
		let item1 = {
			EMLJournalCreationDate: new Date(0),
		};
		let item2 = {
			EMLJournalCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackSort), [item2, item1]);
	});

});
