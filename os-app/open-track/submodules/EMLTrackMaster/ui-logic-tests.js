const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('EMLTrackMasterSymbol', function test_EMLTrackMasterSymbol() {

	it('returns EMLJournalName', function() {
		const EMLJournalName = Math.random().toString();
		deepEqual(mod.EMLTrackMasterSymbol({
			EMLJournalName,
		}), EMLJournalName);
	});

	it('returns alternate', function() {
		deepEqual(mod.EMLTrackMasterSymbol({
			EMLJournalName: '',
		}), '?');
	});

});
