const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;
const EMLJournalStorage = require('../EMLJournal/storage.js').default;

describe('EMLMemoStorageCollectionName', function test_EMLMemoStorageCollectionName() {

	it('returns string', function () {
		deepEqual(mod.EMLMemoStorageCollectionName(), 'eml_memos');
	});

});

describe('EMLMemoStorageCollectionPath', function test_EMLMemoStorageCollectionPath() {

	it('throws if not valid', function () {
		throws(function () {
			mod.EMLMemoStorageCollectionPath('');
		}, /EMLErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.EMLMemoStorageCollectionPath('alfa'), EMLJournalStorage.EMLJournalStorageFolderPath('alfa') + mod.EMLMemoStorageCollectionName() + '/');
	});

});

describe('EMLMemoStorageFolderPath', function test_EMLMemoStorageFolderPath() {

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.EMLMemoStorageFolderPath({});
		}, /EMLErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.EMLMemoStorageFolderPath(StubMemoObjectValid()), mod.EMLMemoStorageCollectionPath(StubJournalObjectValid().EMLJournalID) + StubMemoObjectValid().EMLMemoCreationDate.toJSON().split('T').shift() + '/charlie/');
	});

});

describe('EMLMemoStorageObjectPath', function test_EMLMemoStorageObjectPath() {

	it('throws if not valid', function () {
		throws(function () {
			mod.EMLMemoStorageObjectPath({});
		}, /EMLErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.EMLMemoStorageObjectPath(StubMemoObjectValid()), mod.EMLMemoStorageFolderPath(StubMemoObjectValid()) + 'main');
	});

});

describe('EMLMemoStorageMatch', function test_EMLMemoStorageMatch() {

	it('throws error if not string', function () {
		throws(function () {
			mod.EMLMemoStorageMatch(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns false if EMLJournalStorageObjectPath', function () {
		deepEqual(mod.EMLMemoStorageMatch(EMLJournalStorage.EMLJournalStorageObjectPath('alfa')), false);
	});

	it('returns false if no EMLMemoStorageCollectionPath', function () {
		const item = mod.EMLMemoStorageCollectionPath(StubJournalObjectValid().EMLJournalID);
		deepEqual(mod.EMLMemoStorageMatch(mod.EMLMemoStorageObjectPath(StubMemoObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no EMLMemoStorageObjectPath', function () {
		deepEqual(mod.EMLMemoStorageMatch(mod.EMLMemoStorageObjectPath(StubMemoObjectValid()).slice(0, -1)), false);
	});

	it('returns true', function () {
		deepEqual(mod.EMLMemoStorageMatch(mod.EMLMemoStorageObjectPath(StubMemoObjectValid())), true);
	});

});

describe('EMLMemoStorageWrite', function test_EMLMemoStorageWrite() {

	it('rejects if not object', async function () {
		await rejects(mod.EMLMemoStorageWrite(EMLTestingStorageClient, null), /EMLErrorInputNotValid/);
	});

	it('returns object with EMLErrors if not valid', async function () {
		deepEqual((await mod.EMLMemoStorageWrite(EMLTestingStorageClient, Object.assign(StubMemoObjectValid(), {
			EMLMemoID: null,
		}))).EMLErrors, {
			EMLMemoID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubMemoObjectValid();

		deepEqual(await mod.EMLMemoStorageWrite(EMLTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.EMLMemoStorageWrite(EMLTestingStorageClient, StubMemoObjectValid()), StubMemoObjectValid());
	});

});

describe('EMLMemoStorageList', function test_EMLMemoStorageList() {

	it('rejects if not valid', async function () {
		await rejects(mod.EMLMemoStorageList(EMLTestingStorageClient, {}), /EMLErrorInputNotValid/);
	});

	it('returns empty array if none', async function () {
		deepEqual(await mod.EMLMemoStorageList(EMLTestingStorageClient, StubJournalObjectValid()), {});
	});

	it('returns existing EMLMemos', async function () {
		const item = await mod.EMLMemoStorageWrite(EMLTestingStorageClient, StubMemoObjectValid());
		deepEqual(Object.values(await mod.EMLMemoStorageList(EMLTestingStorageClient, StubJournalObjectValid())), [item]);
		deepEqual(Object.keys(await mod.EMLMemoStorageList(EMLTestingStorageClient, StubJournalObjectValid())), [item.EMLMemoID]);
	});

});

describe('EMLMemoStorageDelete', function test_EMLMemoStorageDelete() {

	it('rejects if param1 not valid', async function () {
		await rejects(mod.EMLMemoStorageDelete(EMLTestingStorageClient, {}), /EMLErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mod.EMLMemoStorageDelete(EMLTestingStorageClient, await mod.EMLMemoStorageWrite(EMLTestingStorageClient, StubMemoObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMLMemo', async function () {
		await mod.EMLMemoStorageDelete(EMLTestingStorageClient, await mod.EMLMemoStorageWrite(EMLTestingStorageClient, StubMemoObjectValid()));
		deepEqual(await mod.EMLMemoStorageList(EMLTestingStorageClient, StubJournalObjectValid()), {});
	});

});
