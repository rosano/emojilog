const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

describe('EMTJournalModelErrorsFor', function test_EMTJournalModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mod.EMTJournalModelErrorsFor(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns object if EMTJournalID not string', function() {
		deepEqual(mod.EMTJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMTJournalID: null,
		})), {
			EMTJournalID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTJournalID not filled', function() {
		deepEqual(mod.EMTJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMTJournalID: ' ',
		})), {
			EMTJournalID: [
				'EMTErrorNotFilled',
			],
		});
	});

	it('returns object if EMTJournalName not string', function() {
		deepEqual(mod.EMTJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMTJournalName: null,
		})), {
			EMTJournalName: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTJournalCreationDate not date', function() {
		deepEqual(mod.EMTJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMTJournalCreationDate: new Date('alfa'),
		})), {
			EMTJournalCreationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns object if EMTJournalModificationDate not date', function() {
		deepEqual(mod.EMTJournalModelErrorsFor(Object.assign(StubJournalObjectValid(), {
			EMTJournalModificationDate: new Date('alfa'),
		})), {
			EMTJournalModificationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.EMTJournalModelErrorsFor(StubJournalObjectValid()), null);
	});

	context('EMTOptionValidateIfNotPresent', function() {

		it('returns object if not valid', function() {
			deepEqual(Object.keys(mod.EMTJournalModelErrorsFor({}, {
				EMTOptionValidateIfNotPresent: true,
			})), [
				'EMTJournalID',
				'EMTJournalName',
				'EMTJournalCreationDate',
				'EMTJournalModificationDate',
			]);
		});

	});

});
