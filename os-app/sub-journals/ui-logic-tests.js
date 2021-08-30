const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const EMLTrackTimerLogic = require('./submodules/EMLTrackTimer/ui-logic.js');
const OLSKMoment = require('OLSKMoment');

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('EMLTrackJournalsSort', function test_EMLTrackJournalsSort() {

	it('sorts by EMLJournalTouchDate descending', function() {
		const item1 = {
			EMLJournalTouchDate: new Date(0),
		};
		const item2 = {
			EMLJournalTouchDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackJournalsSort), [item2, item1]);
	});

	it('sorts EMLJournalTouchDate below if one has none', function() {
		const item1 = {
			EMLJournalTouchDate: new Date(0),
		};
		const item2 = {
			EMLJournalModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackJournalsSort), [item2, item1]);
	});

	it('sorts by EMLJournalModificationDate descending', function() {
		const item1 = {
			EMLJournalModificationDate: new Date(0),
		};
		const item2 = {
			EMLJournalModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackJournalsSort), [item2, item1]);
	});

	it('sorts by EMLJournalCreationDate descending if no EMLJournalModificationDate', function() {
		const item1 = {
			EMLJournalCreationDate: new Date(0),
		};
		const item2 = {
			EMLJournalCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.EMLTrackJournalsSort), [item2, item1]);
	});

});

describe('EMLTrackJournalsChunkFunction', function test_EMLTrackJournalsChunkFunction() {

	const _EMLTrackJournalsChunkFunction = function (inputData) {
		return mod.EMLTrackJournalsChunkFunction([stub], uLocalized);
	};

	it('throws if not array', function () {
		throws(function () {
			mod.EMLTrackJournalsChunkFunction(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mod.EMLTrackJournalsChunkFunction([]), {});
	});

	it('groups if no touch', function() {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod.EMLTrackJournalsChunkFunction([item], uLocalized), {
			[uLocalized('EMLTrackJournalsGroupReadyText')]: [item],
		});
	});

	it('groups if same day', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()).valueOf() + uRandomElement(EMLTrackTimerLogic.EMLTrackTimerFrameMinute(), EMLTrackTimerLogic.EMLTrackTimerFrameHour(), EMLTrackTimerLogic.EMLTrackTimerFrameDay()) * Math.random()),
		};
		deepEqual(mod.EMLTrackJournalsChunkFunction([item], uLocalized), {
			[uLocalized('EMLTrackJournalsGroupTodayText')]: [item],
		});
	});

	it('groups if under month', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - Math.max(EMLTrackTimerLogic.EMLTrackTimerFrameDay(), Math.min(EMLTrackTimerLogic.EMLTrackTimerFrameMonth(), uRandomElement(EMLTrackTimerLogic.EMLTrackTimerFrames()) * Math.random())) + 1),
		};
		deepEqual(mod.EMLTrackJournalsChunkFunction([item], uLocalized), {
			[uLocalized('EMLTrackJournalsGroupEarlierText')]: [item],
		});
	});

	it('groups if over month', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - Math.max(EMLTrackTimerLogic.EMLTrackTimerFrameMonth(), EMLTrackTimerLogic.EMLTrackTimerFrameYear() * Math.random())),
		};
		deepEqual(mod.EMLTrackJournalsChunkFunction([item], uLocalized), {
			[uLocalized('EMLTrackJournalsGroupOverMonthText')]: [item],
		});
	});

	it('groups if over year', function() {
		const item = {
			EMLJournalTouchDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - EMLTrackTimerLogic.EMLTrackTimerFrameYear() - 1),
		};
		deepEqual(mod.EMLTrackJournalsChunkFunction([item], uLocalized), {
			[uLocalized('EMLTrackJournalsGroupOverYearText')]: [item],
		});
	});

});

describe('EMLTrackJournalsAccessibilitySummary', function test_EMLTrackJournalsAccessibilitySummary() {

	it('returns EMLJournalName', function() {
		const EMLJournalName = Math.random().toString();
		deepEqual(mod.EMLTrackJournalsAccessibilitySummary({
			EMLJournalName,
		}), EMLJournalName);
	});

	it('returns EMLTrackJournalsListItemUntitledText if no EMLJournalName', function() {
		deepEqual(mod.EMLTrackJournalsAccessibilitySummary({
			EMLJournalName: '',
		}, uLocalized), uLocalized('EMLTrackJournalsListItemUntitledText'));
	});

});

describe('EMLTrackJournalsSymbol', function test_EMLTrackJournalsSymbol() {

	it('returns EMLJournalName', function() {
		const EMLJournalName = Math.random().toString();
		deepEqual(mod.EMLTrackJournalsSymbol({
			EMLJournalName,
		}), EMLJournalName);
	});

	it('splits if space', function() {
		const item = Math.random().toString();
		deepEqual(mod.EMLTrackJournalsSymbol({
			EMLJournalName: item + ' ' + Math.random().toString(),
		}), item);
	});

	it('returns alternate', function() {
		deepEqual(mod.EMLTrackJournalsSymbol({
			EMLJournalName: '',
		}), '?');
	});

});
