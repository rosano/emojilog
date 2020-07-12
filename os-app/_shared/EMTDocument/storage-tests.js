const { rejects, throws, deepEqual } = require('assert');

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

describe('EMTDocumentStorageWrite', function test_EMTDocumentStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.EMTDocumentStorageWrite(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.EMTDocumentStorageWrite(EMTTestingStorageClient, Object.assign(StubDocumentObjectValid(), {
			EMTDocumentID: null,
		}))).EMTErrors, {
			EMTDocumentID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTDocument', async function() {
		let item = await mainModule.EMTDocumentStorageWrite(EMTTestingStorageClient, StubDocumentObjectValid());

		deepEqual(item, Object.assign(StubDocumentObjectValid(), {
			'@context': item['@context'],
		}));
	});

	context('relations', function () {

		const item = Object.assign(StubDocumentObjectValid(), {
			$alfa: 'bravo',
		});
		let outputData, storage;

		before(async function () {
			outputData = await mainModule.EMTDocumentStorageWrite(EMTTestingStorageClient, item);
		});
		
		before(async function () {
			storage = Object.values(await mainModule.EMTDocumentStorageList(EMTTestingStorageClient));
		});
		
		it('excludes from storage', function () {
			deepEqual(storage, [Object.assign(StubDocumentObjectValid(), {
				'@context': item['@context'],
			})]);
		});
		
		it('includes in outputData', function () {
			deepEqual(outputData, item);
		});

		it('updates inputData', function () {
			deepEqual(outputData === item, true);
		});
	
	});

});

describe('EMTDocumentStorageList', function test_EMTDocumentStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.EMTDocumentStorageList(EMTTestingStorageClient), {});
	});

	it('returns existing EMTDocuments', async function() {
		let item = await mainModule.EMTDocumentStorageWrite(EMTTestingStorageClient, StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.EMTDocumentStorageList(EMTTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.EMTDocumentStorageList(EMTTestingStorageClient)), [item.EMTDocumentID]);
	});

});

describe('EMTDocumentStorageDelete', function test_EMTDocumentStorageDelete() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.EMTDocumentStorageDelete(EMTTestingStorageClient, {})
		}, /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.EMTDocumentStorageDelete(EMTTestingStorageClient, await mainModule.EMTDocumentStorageWrite(EMTTestingStorageClient, StubDocumentObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMTDocument', async function() {
		await mainModule.EMTDocumentStorageDelete(EMTTestingStorageClient, await mainModule.EMTDocumentStorageWrite(EMTTestingStorageClient, StubDocumentObjectValid()));
		deepEqual(await mainModule.EMTDocumentStorageList(EMTTestingStorageClient), {});
	});

});
