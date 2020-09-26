const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

const kTesting = {
	StubDocumentObjectValid() {
		return {
			EMTJournalID: 'alfa',
			EMTJournalName: '',
			EMTJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
			EMTJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('EMTJournalModelErrorsFor', function test_EMTJournalModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.EMTJournalModelErrorsFor(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns object if EMTJournalID not string', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTJournalID: null,
		})), {
			EMTJournalID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTJournalID not filled', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTJournalID: ' ',
		})), {
			EMTJournalID: [
				'EMTErrorNotFilled',
			],
		});
	});

	it('returns object if EMTJournalName not string', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTJournalName: null,
		})), {
			EMTJournalName: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTJournalCreationDate not date', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTJournalCreationDate: new Date('alfa'),
		})), {
			EMTJournalCreationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns object if EMTJournalModificationDate not date', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTJournalModificationDate: new Date('alfa'),
		})), {
			EMTJournalModificationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.EMTJournalModelErrorsFor(kTesting.StubDocumentObjectValid()), null);
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
