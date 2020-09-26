const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

describe('EMTJournalModelErrorsFor', function test_EMTJournalModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.EMTJournalModelErrorsFor(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns object if EMTJournalID not string', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(StubDocumentObjectValid(), {
			EMTJournalID: null,
		})), {
			EMTJournalID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTJournalID not filled', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(StubDocumentObjectValid(), {
			EMTJournalID: ' ',
		})), {
			EMTJournalID: [
				'EMTErrorNotFilled',
			],
		});
	});

	it('returns object if EMTJournalName not string', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(StubDocumentObjectValid(), {
			EMTJournalName: null,
		})), {
			EMTJournalName: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTJournalCreationDate not date', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(StubDocumentObjectValid(), {
			EMTJournalCreationDate: new Date('alfa'),
		})), {
			EMTJournalCreationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns object if EMTJournalModificationDate not date', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(StubDocumentObjectValid(), {
			EMTJournalModificationDate: new Date('alfa'),
		})), {
			EMTJournalModificationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(StubDocumentObjectValid()), null);
	});

	context('EMTOptionValidateIfNotPresent', function() {

		it('returns object if not valid', function() {
			deepEqual(Object.keys(mainModule.EMTJournalModelErrorsFor({}, {
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
