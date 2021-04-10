const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const EMLTrackTimerLogic = require('../EMLTrackTimer/ui-logic.js');
const OLSKMoment = require('OLSKMoment');

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('EMLTrackMasterSort', function test_EMLTrackMasterSort() {

	it('sorts by EMLJournalTouchDate descending', function() {
		const item1 = {
			EMLJournalTouchDate: new Date(0),
		};
		const item2 = {
			EMLJournalTouchDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackMasterSort), [item2, item1]);
	});

	it('sorts EMLJournalTouchDate below if one has none', function() {
		const item1 = {
			EMLJournalTouchDate: new Date(0),
		};
		const item2 = {
			EMLJournalModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackMasterSort), [item2, item1]);
	});

	it('sorts by EMLJournalModificationDate descending', function() {
		const item1 = {
			EMLJournalModificationDate: new Date(0),
		};
		const item2 = {
			EMLJournalModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackMasterSort), [item2, item1]);
	});

	it('sorts by EMLJournalCreationDate descending if no EMLJournalModificationDate', function() {
		const item1 = {
			EMLJournalCreationDate: new Date(0),
		};
		const item2 = {
			EMLJournalCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackMasterSort), [item2, item1]);
	});

});

describe('EMLTrackMasterGroupFunction', function test_EMLTrackMasterGroupFunction() {

	const _EMLTrackMasterGroupFunction = function (inputData) {
		return mod.EMLTrackMasterGroupFunction([stub], uLocalized);
	};

	it('throws if not array', function () {
		throws(function () {
			mod.EMLTrackMasterGroupFunction(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mod.EMLTrackMasterGroupFunction([]), {});
	});

	it('groups if no touch', function() {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod.EMLTrackMasterGroupFunction([item], uLocalized), {
			[uLocalized('EMLTrackMasterGroupReadyText')]: [item],
		});
	});

	it('groups if same day', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()).valueOf() + uRandomElement(EMLTrackTimerLogic.EMLTrackTimerFrameMinute(), EMLTrackTimerLogic.EMLTrackTimerFrameHour(), EMLTrackTimerLogic.EMLTrackTimerFrameDay()) * Math.random()),
		};
		deepEqual(mod.EMLTrackMasterGroupFunction([item], uLocalized), {
			[uLocalized('EMLTrackMasterGroupTodayText')]: [item],
		});
	});

	it('groups if under month', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - Math.max(EMLTrackTimerLogic.EMLTrackTimerFrameDay(), Math.min(EMLTrackTimerLogic.EMLTrackTimerFrameMonth(), uRandomElement(EMLTrackTimerLogic.EMLTrackTimerFrames()) * Math.random())) + 1),
		};
		deepEqual(mod.EMLTrackMasterGroupFunction([item], uLocalized), {
			[uLocalized('EMLTrackMasterGroupEarlierText')]: [item],
		});
	});

	it('groups if over month', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - Math.max(EMLTrackTimerLogic.EMLTrackTimerFrameMonth(), EMLTrackTimerLogic.EMLTrackTimerFrameYear() * Math.random())),
		};
		deepEqual(mod.EMLTrackMasterGroupFunction([item], uLocalized), {
			[uLocalized('EMLTrackMasterGroupOverMonthText')]: [item],
		});
	});

	it('groups if over year', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - EMLTrackTimerLogic.EMLTrackTimerFrameYear() - 1),
		};
		deepEqual(mod.EMLTrackMasterGroupFunction([item], uLocalized), {
			[uLocalized('EMLTrackMasterGroupOverYearText')]: [item],
		});
	});

});

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

	it('splits if space', function() {
		const item = Math.random().toString();
		deepEqual(mod.EMLTrackMasterSymbol({
			EMLJournalName: item + ' ' + Math.random().toString(),
		}), item);
	});

	it('returns alternate', function() {
		deepEqual(mod.EMLTrackMasterSymbol({
			EMLJournalName: '',
		}), '?');
	});

});
