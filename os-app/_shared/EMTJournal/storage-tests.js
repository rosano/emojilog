const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;

describe('EMTJournalStorageCollectionName', function test_EMTJournalStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mod.EMTJournalStorageCollectionName(), 'emt_journals');
	});

});

describe('EMTJournalStorageCollectionPath', function test_EMTJournalStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mod.EMTJournalStorageCollectionPath(), mod.EMTJournalStorageCollectionName() + '/');
	});

});

describe('EMTJournalStorageFolderPath', function test_EMTJournalStorageFolderPath() {

	it('throws error if blank', function() {
		throws(function() {
			mod.EMTJournalStorageFolderPath('');
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.EMTJournalStorageFolderPath('alfa'), mod.EMTJournalStorageCollectionPath() + 'alfa/');
	});

});

describe('EMTJournalStorageObjectPath', function test_EMTJournalStorageObjectPath() {

	it('throws error if blank', function() {
		throws(function() {
			mod.EMTJournalStorageObjectPath('');
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.EMTJournalStorageObjectPath('alfa'), mod.EMTJournalStorageFolderPath('alfa') + 'main');
	});

});

describe('EMTJournalStorageMatch', function test_EMTJournalStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mod.EMTJournalStorageMatch(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns false if no EMTJournalStorageCollectionPath', function() {
		deepEqual(mod.EMTJournalStorageMatch(mod.EMTJournalStorageObjectPath('alfa').replace(mod.EMTJournalStorageCollectionPath(), mod.EMTJournalStorageCollectionPath().slice(1))), false);
	});

	it('returns false if no EMTJournalStorageObjectPath', function() {
		deepEqual(mod.EMTJournalStorageMatch(mod.EMTJournalStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mod.EMTJournalStorageMatch(mod.EMTJournalStorageObjectPath('alfa')), true);
	});

});

describe('EMTJournalStorageWrite', function test_EMTJournalStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mod.EMTJournalStorageWrite(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mod.EMTJournalStorageWrite(EMTTestingStorageClient, Object.assign(StubJournalObjectValid(), {
			EMTJournalID: null,
		}))).EMTErrors, {
			EMTJournalID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubJournalObjectValid();

		deepEqual(await mod.EMTJournalStorageWrite(EMTTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid()), StubJournalObjectValid());
	});

	context('relations', function () {

		const item = Object.assign(StubJournalObjectValid(), {
			$alfa: 'bravo',
		});
		let outputData, storage;

		before(async function () {
			outputData = await mod.EMTJournalStorageWrite(EMTTestingStorageClient, item);
		});
		
		before(async function () {
			storage = Object.values(await mod.EMTJournalStorageList(EMTTestingStorageClient));
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
		deepEqual(await mod.EMTJournalStorageList(EMTTestingStorageClient), {});
	});

	it('returns existing EMTJournals', async function() {
		let item = await mod.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid());
		deepEqual(Object.values(await mod.EMTJournalStorageList(EMTTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mod.EMTJournalStorageList(EMTTestingStorageClient)), [item.EMTJournalID]);
	});

});

describe('EMTJournalStorageDelete', function test_EMTJournalStorageDelete() {

	it('throws if not valid', function () {
		throws(function () {
			mod.EMTJournalStorageDelete(EMTTestingStorageClient, {})
		}, /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mod.EMTJournalStorageDelete(EMTTestingStorageClient, await mod.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMTJournal', async function() {
		await mod.EMTJournalStorageDelete(EMTTestingStorageClient, await mod.EMTJournalStorageWrite(EMTTestingStorageClient, StubJournalObjectValid()));
		deepEqual(await mod.EMTJournalStorageList(EMTTestingStorageClient), {});
	});

});
