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

describe('EMTDocumentModelPreJSONSchemaValidate', function test_EMTDocumentModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.EMTDocumentModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with EMTDocumentCreationDate as string', function() {
		deepEqual(mainModule.EMTDocumentModelPreJSONSchemaValidate({
			EMTDocumentCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			EMTDocumentCreationDate: '2018-12-09T19:07:01.902Z',
		});
	});

	it('returns input with EMTDocumentModificationDate as string', function() {
		deepEqual(mainModule.EMTDocumentModelPreJSONSchemaValidate({
			EMTDocumentModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			EMTDocumentModificationDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('EMTDocumentModelPostJSONParse', function test_EMTDocumentModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.EMTDocumentModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.EMTDocumentModelPostJSONParse({}), {});
	});

	it('returns input with EMTDocumentCreationDate as date', function() {
		deepEqual(mainModule.EMTDocumentModelPostJSONParse({
			EMTDocumentCreationDate: '2018-12-09T19:07:01.902Z',
		}), {
			EMTDocumentCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

	it('returns input with EMTDocumentModificationDate as date', function() {
		deepEqual(mainModule.EMTDocumentModelPostJSONParse({
			EMTDocumentModificationDate: '2018-12-09T19:07:01.902Z',
		}), {
			EMTDocumentModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
