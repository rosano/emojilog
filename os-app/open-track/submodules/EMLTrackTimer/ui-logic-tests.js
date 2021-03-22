const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('EMLTrackTimerFrameMinute', function test_EMLTrackTimerFrameMinute() {

	it('returns number', function () {
		deepEqual(mod.EMLTrackTimerFrameMinute(), 1000 * 60);
	});

});

describe('EMLTrackTimerFrameHour', function test_EMLTrackTimerFrameHour() {

	it('returns number', function () {
		deepEqual(mod.EMLTrackTimerFrameHour(), mod.EMLTrackTimerFrameMinute() * 60);
	});

});

describe('EMLTrackTimerFrameDay', function test_EMLTrackTimerFrameDay() {

	it('returns number', function () {
		deepEqual(mod.EMLTrackTimerFrameDay(), mod.EMLTrackTimerFrameHour() * 24);
	});

});

describe('EMLTrackTimerFrameWeek', function test_EMLTrackTimerFrameWeek() {

	it('returns number', function () {
		deepEqual(mod.EMLTrackTimerFrameWeek(), mod.EMLTrackTimerFrameDay() * 7);
	});

});

describe('EMLTrackTimerFrameMonth', function test_EMLTrackTimerFrameMonth() {

	it('returns number', function () {
		deepEqual(mod.EMLTrackTimerFrameMonth(), mod.EMLTrackTimerFrameDay() * 365 / 12.0);
	});

});

describe('EMLTrackTimerFrameYear', function test_EMLTrackTimerFrameYear() {

	it('returns number', function () {
		deepEqual(mod.EMLTrackTimerFrameYear(), mod.EMLTrackTimerFrameDay() * 365);
	});

});

describe('EMLTrackTimerFrameInfinity', function test_EMLTrackTimerFrameInfinity() {

	it('returns string', function () {
		deepEqual(mod.EMLTrackTimerFrameInfinity(), Infinity);
	});

});

describe('EMLTrackTimerFrames', function test_EMLTrackTimerFrames() {

	it('returns array', function () {
		deepEqual(mod.EMLTrackTimerFrames(), [
			mod.EMLTrackTimerFrameMinute(),
			mod.EMLTrackTimerFrameHour(),
			mod.EMLTrackTimerFrameDay(),
			mod.EMLTrackTimerFrameWeek(),
			mod.EMLTrackTimerFrameMonth(),
			mod.EMLTrackTimerFrameYear(),
			mod.EMLTrackTimerFrameInfinity(),
			]);
	});

});

describe('EMLTrackTimerFrame', function test_EMLTrackTimerFrame() {

	it('throws if param1 not date', function () {
		throws(function () {
			mod.EMLTrackTimerFrame(new Date('alfa'), new Date());
		}, /EMLErrorInputNotValid/);
	});

	it('throws if param2 not date', function () {
		throws(function () {
			mod.EMLTrackTimerFrame(new Date(), new Date('alfa'));
		}, /EMLErrorInputNotValid/);
	});

	it('returns if not EMLTrackTimerFrameMinute', function () {
		deepEqual(mod.EMLTrackTimerFrame(new Date(0), new Date(mod.EMLTrackTimerFrameMinute() - 1)), mod.EMLTrackTimerFrameMinute());
	});

	it('returns if not EMLTrackTimerFrameHour', function () {
		deepEqual(mod.EMLTrackTimerFrame(new Date(0), new Date(mod.EMLTrackTimerFrameHour() - 1)), mod.EMLTrackTimerFrameHour());
	});

	it('returns4 if not EMLTrackTimerFrameDay', function () {
		deepEqual(mod.EMLTrackTimerFrame(new Date(0), new Date(mod.EMLTrackTimerFrameDay() - 1)), mod.EMLTrackTimerFrameDay());
	});

	it('returns if not EMLTrackTimerFrameWeek', function () {
		deepEqual(mod.EMLTrackTimerFrame(new Date(0), new Date(mod.EMLTrackTimerFrameWeek() - 1)), mod.EMLTrackTimerFrameWeek());
	});

	it('returns if not EMLTrackTimerFrameMonth', function () {
		deepEqual(mod.EMLTrackTimerFrame(new Date(0), new Date(mod.EMLTrackTimerFrameMonth() - 1)), mod.EMLTrackTimerFrameMonth());
	});

	it('returns2 if not EMLTrackTimerFrameYear', function () {
		deepEqual(mod.EMLTrackTimerFrame(new Date(0), new Date(mod.EMLTrackTimerFrameYear() - 1)), mod.EMLTrackTimerFrameYear());
	});

	it('returns if EMLTrackTimerFrameInfinity', function () {
		deepEqual(mod.EMLTrackTimerFrame(new Date(0), new Date(mod.EMLTrackTimerFrameYear())), mod.EMLTrackTimerFrameInfinity());
	});

});

describe('EMLTrackTimerLinesMap', function test_EMLTrackTimerLinesMap() {

	it('returns object', function () {
		deepEqual(mod.EMLTrackTimerLines(), {
			[mod.EMLTrackTimerFrameMinute()]: 1,
			[mod.EMLTrackTimerFrameHour()]: 4,
			[mod.EMLTrackTimerFrameDay()]: 24,
			[mod.EMLTrackTimerFrameWeek()]: 7,
			[mod.EMLTrackTimerFrameMonth()]: 2,
			[mod.EMLTrackTimerFrameYear()]: 12,
			[mod.EMLTrackTimerFrameInfinity()]: 0,
		});
	});

});
