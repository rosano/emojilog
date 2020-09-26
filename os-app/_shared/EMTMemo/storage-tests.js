const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;
const EMTJournalStorage = require('../EMTJournal/storage.js').default;

describe('EMTMemoStorageCollectionName', function test_EMTMemoStorageCollectionName() {

	it('returns string', function () {
		deepEqual(mod.EMTMemoStorageCollectionName(), 'emt_memos');
	});

});

describe('EMTMemoStorageCollectionPath', function test_EMTMemoStorageCollectionPath() {

	it('throws if not valid', function () {
		throws(function () {
			mod.EMTMemoStorageCollectionPath('');
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.EMTMemoStorageCollectionPath('alfa'), EMTJournalStorage.EMTJournalStorageFolderPath('alfa') + mod.EMTMemoStorageCollectionName() + '/');
	});

});

describe('EMTMemoStorageFolderPath', function test_EMTMemoStorageFolderPath() {

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.EMTMemoStorageFolderPath({});
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.EMTMemoStorageFolderPath(StubMemoObjectValid()), mod.EMTMemoStorageCollectionPath(StubJournalObjectValid().EMTJournalID) + StubMemoObjectValid().EMTMemoCreationDate.toJSON().split('T').shift() + '/charlie/');
	});

});

describe('EMTMemoStorageObjectPath', function test_EMTMemoStorageObjectPath() {

	it('throws if not valid', function () {
		throws(function () {
			mod.EMTMemoStorageObjectPath({});
		}, /EMTErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.EMTMemoStorageObjectPath(StubMemoObjectValid()), mod.EMTMemoStorageFolderPath(StubMemoObjectValid()) + 'main');
	});

});

describe('EMTMemoStorageMatch', function test_EMTMemoStorageMatch() {

	it('throws error if not string', function () {
		throws(function () {
			mod.EMTMemoStorageMatch(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns false if EMTJournalStorageObjectPath', function () {
		deepEqual(mod.EMTMemoStorageMatch(EMTJournalStorage.EMTJournalStorageObjectPath('alfa')), false);
	});

	it('returns false if no EMTMemoStorageCollectionPath', function () {
		const item = mod.EMTMemoStorageCollectionPath(StubJournalObjectValid().EMTJournalID);
		deepEqual(mod.EMTMemoStorageMatch(mod.EMTMemoStorageObjectPath(StubMemoObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no EMTMemoStorageObjectPath', function () {
		deepEqual(mod.EMTMemoStorageMatch(mod.EMTMemoStorageObjectPath(StubMemoObjectValid()).slice(0, -1)), false);
	});

	it('returns true', function () {
		deepEqual(mod.EMTMemoStorageMatch(mod.EMTMemoStorageObjectPath(StubMemoObjectValid())), true);
	});

});

describe('EMTMemoStorageWrite', function test_EMTMemoStorageWrite() {

	it('rejects if not object', async function () {
		await rejects(mod.EMTMemoStorageWrite(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function () {
		deepEqual((await mod.EMTMemoStorageWrite(EMTTestingStorageClient, Object.assign(StubMemoObjectValid(), {
			EMTMemoID: null,
		}))).EMTErrors, {
			EMTMemoID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubMemoObjectValid();

		deepEqual(await mod.EMTMemoStorageWrite(EMTTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.EMTMemoStorageWrite(EMTTestingStorageClient, StubMemoObjectValid()), StubMemoObjectValid());
	});

});

describe('EMTMemoStorageList', function test_EMTMemoStorageList() {

	it('rejects if not valid', async function () {
		await rejects(mod.EMTMemoStorageList(EMTTestingStorageClient, {}), /EMTErrorInputNotValid/);
	});

	it('returns empty array if none', async function () {
		deepEqual(await mod.EMTMemoStorageList(EMTTestingStorageClient, StubJournalObjectValid()), {});
	});

	it('returns existing EMTMemos', async function () {
		const item = await mod.EMTMemoStorageWrite(EMTTestingStorageClient, StubMemoObjectValid());
		deepEqual(Object.values(await mod.EMTMemoStorageList(EMTTestingStorageClient, StubJournalObjectValid())), [item]);
		deepEqual(Object.keys(await mod.EMTMemoStorageList(EMTTestingStorageClient, StubJournalObjectValid())), [item.EMTMemoID]);
	});

});

describe('EMTMemoStorageDelete', function test_EMTMemoStorageDelete() {

	it('rejects if param1 not valid', async function () {
		await rejects(mod.EMTMemoStorageDelete(EMTTestingStorageClient, {}), /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mod.EMTMemoStorageDelete(EMTTestingStorageClient, await mod.EMTMemoStorageWrite(EMTTestingStorageClient, StubMemoObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMTMemo', async function () {
		await mod.EMTMemoStorageDelete(EMTTestingStorageClient, await mod.EMTMemoStorageWrite(EMTTestingStorageClient, StubMemoObjectValid()));
		deepEqual(await mod.EMTMemoStorageList(EMTTestingStorageClient, StubJournalObjectValid()), {});
	});

});
