const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

describe('EMLJournalModelErrorsFor', function test_EMLJournalModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mod.EMLJournalModelErrorsFor(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object if EMLJournalID not string', function() {
		deepEqual(mod.EMLJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMLJournalID: null,
		})), {
			EMLJournalID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLJournalID not filled', function() {
		deepEqual(mod.EMLJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMLJournalID: ' ',
		})), {
			EMLJournalID: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLJournalName not string', function() {
		deepEqual(mod.EMLJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMLJournalName: null,
		})), {
			EMLJournalName: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLJournalCreationDate not date', function() {
		deepEqual(mod.EMLJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMLJournalCreationDate: new Date('alfa'),
		})), {
			EMLJournalCreationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLJournalModificationDate not date', function() {
		deepEqual(mod.EMLJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMLJournalModificationDate: new Date('alfa'),
		})), {
			EMLJournalModificationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.EMLJournalModelErrorsFor(StubJournalObjectValid()), null);
	});

	context('EMLOptionValidateIfNotPresent', function() {

		it('returns object if not valid', function() {
			deepEqual(Object.keys(mod.EMLJournalModelErrorsFor({}, {
				EMLOptionValidateIfNotPresent: true,
			})), [
				'EMLJournalID',
				'EMLJournalName',
				'EMLJournalCreationDate',
				'EMLJournalModificationDate',
			]);
		});

	});

});
