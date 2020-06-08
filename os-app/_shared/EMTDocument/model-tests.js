const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js');

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			EMTDocumentID: 'alfa',
			EMTDocumentName: '',
			EMTDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			EMTDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('EMTDocumentModelErrorsFor', function test_EMTDocumentModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.EMTDocumentModelErrorsFor(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns object if EMTDocumentID not string', function() {
		deepEqual(mainModule.EMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTDocumentID: null,
		})), {
			EMTDocumentID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTDocumentID not filled', function() {
		deepEqual(mainModule.EMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTDocumentID: ' ',
		})), {
			EMTDocumentID: [
				'EMTErrorNotFilled',
			],
		});
	});

	it('returns object if EMTDocumentName not string', function() {
		deepEqual(mainModule.EMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTDocumentName: null,
		})), {
			EMTDocumentName: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTDocumentCreationDate not date', function() {
		deepEqual(mainModule.EMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTDocumentCreationDate: new Date('alfa'),
		})), {
			EMTDocumentCreationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns object if EMTDocumentModificationDate not date', function() {
		deepEqual(mainModule.EMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTDocumentModificationDate: new Date('alfa'),
		})), {
			EMTDocumentModificationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.EMTDocumentModelErrorsFor(kTesting.StubDocumentObjectValid()), null);
	});

});
