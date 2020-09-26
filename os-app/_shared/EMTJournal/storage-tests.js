const { rejects, throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('EMTJournalStorageCollectionName', function test_EMTJournalStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.EMTJournalStorageCollectionName(), 'emt_documents');
	});

});

describe('EMTJournalStorageCollectionPath', function test_EMTJournalStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mainModule.EMTJournalStorageCollectionPath(), mainModule.EMTJournalStorageCollectionName() + '/');
	});

});

describe('EMTJournalStorageFolderPath', function test_EMTJournalStorageFolderPath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.EMTJournalStorageFolderPath('');
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.EMTJournalStorageFolderPath('alfa'), mainModule.EMTJournalStorageCollectionPath() + 'alfa/');
	});

});

describe('EMTJournalStorageObjectPath', function test_EMTJournalStorageObjectPath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.EMTJournalStorageObjectPath('');
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.EMTJournalStorageObjectPath('alfa'), mainModule.EMTJournalStorageFolderPath('alfa') + 'main');
	});

});

describe('EMTJournalStorageMatch', function test_EMTJournalStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.EMTJournalStorageMatch(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns false if no EMTJournalStorageCollectionPath', function() {
		deepEqual(mainModule.EMTJournalStorageMatch(mainModule.EMTJournalStorageObjectPath('alfa').replace(mainModule.EMTJournalStorageCollectionPath(), mainModule.EMTJournalStorageCollectionPath().slice(1))), false);
	});

	it('returns false if no EMTJournalStorageObjectPath', function() {
		deepEqual(mainModule.EMTJournalStorageMatch(mainModule.EMTJournalStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.EMTJournalStorageMatch(mainModule.EMTJournalStorageObjectPath('alfa')), true);
	});

});

describe('EMTJournalStorageWrite', function test_EMTJournalStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, Object.assign(StubJournalObjectValid(), {
			EMTJournalID: null,
		}))).EMTErrors, {
			EMTJournalID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubJournalObjectValid();

		deepEqual(await mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid()), StubJournalObjectValid());
	});

	context('relations', function () {

		const item = Object.assign(StubJournalObjectValid(), {
			$alfa: 'bravo',
		});
		let outputData, storage;

		before(async function () {
			outputData = await mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, item);
		});
		
		before(async function () {
			storage = Object.values(await mainModule.EMTJournalStorageList(EMTTestingStorageClient));
		});
		
		it('excludes from storage', function () {
			deepEqual(storage, [StubJournalObjectValid()]);
		});
		
		it('includes in outputData', function () {
			deepEqual(outputData, item);
		});

		it('updates inputData', function () {
			deepEqual(outputData === item, true);
		});
	
	});

});

describe('EMTJournalStorageList', function test_EMTJournalStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.EMTJournalStorageList(EMTTestingStorageClient), {});
	});

	it('returns existing EMTJournals', async function() {
		let item = await mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid());
		deepEqual(Object.values(await mainModule.EMTJournalStorageList(EMTTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.EMTJournalStorageList(EMTTestingStorageClient)), [item.EMTJournalID]);
	});

});

describe('EMTJournalStorageDelete', function test_EMTJournalStorageDelete() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.EMTJournalStorageDelete(EMTTestingStorageClient, {})
		}, /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.EMTJournalStorageDelete(EMTTestingStorageClient, await mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMTJournal', async function() {
		await mainModule.EMTJournalStorageDelete(EMTTestingStorageClient, await mainModule.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid()));
		deepEqual(await mainModule.EMTJournalStorageList(EMTTestingStorageClient), {});
	});

});
