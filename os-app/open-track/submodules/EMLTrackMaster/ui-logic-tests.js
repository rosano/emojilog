const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('EMLTrackMasterAccessibilitySummary', function test_EMLTrackMasterAccessibilitySummary() {

	it('returns EMLJournalName', function() {
		const EMLJournalName = Math.random().toString();
		deepEqual(mod.EMLTrackMasterAccessibilitySummary({
			EMLJournalName,
		}), EMLJournalName);
	});

	it('returns EMLTrackMasterListItemUntitledText if no EMLJournalName', function() {
		deepEqual(mod.EMLTrackMasterAccessibilitySummary({
			EMLJournalName: '',
		}, uLocalized), uLocalized('EMLTrackMasterListItemUntitledText'));
	});

});

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
