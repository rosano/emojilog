const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('EMTDocumentStoragePath', function test_EMTDocumentStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.EMTDocumentStoragePath('alfa'), 'emt_documents/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.EMTDocumentStoragePath(''), 'emt_documents/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.EMTDocumentStoragePath(), 'emt_documents/');
	});

});
