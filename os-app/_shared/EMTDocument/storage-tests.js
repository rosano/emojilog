const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('EMTDocumentStorageCollectionName', function test_EMTDocumentStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.EMTDocumentStorageCollectionName(), 'emt_documents');
	});

});

describe('EMTDocumentStorageCollectionType', function test_EMTDocumentStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.EMTDocumentStorageCollectionType(), 'emt_document');
	});

});

describe('EMTDocumentStorageCollectionPath', function test_EMTDocumentStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mainModule.EMTDocumentStorageCollectionPath(), mainModule.EMTDocumentStorageCollectionName() + '/');
	});

});

describe('EMTDocumentStorageFolderPath', function test_EMTDocumentStorageFolderPath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.EMTDocumentStorageFolderPath('');
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.EMTDocumentStorageFolderPath('alfa'), mainModule.EMTDocumentStorageCollectionPath() + 'alfa/');
	});

});

describe('EMTDocumentStorageObjectPath', function test_EMTDocumentStorageObjectPath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.EMTDocumentStorageObjectPath('');
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.EMTDocumentStorageObjectPath('alfa'), mainModule.EMTDocumentStorageFolderPath('alfa') + 'main');
	});

});

describe('EMTDocumentStorageMatch', function test_EMTDocumentStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.EMTDocumentStorageMatch(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns false if no EMTDocumentStorageCollectionPath', function() {
		deepEqual(mainModule.EMTDocumentStorageMatch(mainModule.EMTDocumentStorageObjectPath('alfa').replace(mainModule.EMTDocumentStorageCollectionPath(), mainModule.EMTDocumentStorageCollectionPath().slice(1))), false);
	});

	it('returns false if no EMTDocumentStorageObjectPath', function() {
		deepEqual(mainModule.EMTDocumentStorageMatch(mainModule.EMTDocumentStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.EMTDocumentStorageMatch(mainModule.EMTDocumentStorageObjectPath('alfa')), true);
	});

});
