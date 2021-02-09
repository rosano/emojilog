const { rejects, deepEqual } = require('assert');

const mod = require('./action.js').default;
const EMLMemoStorage = require('./storage.js').default;
const OLSKRemoteStorage = require('OLSKRemoteStorage');

const uMemo = function (inputData) {
	return Object.assign({
		EMLMemoJournalID: 'alfa',
		EMLMemoEventDate: new Date('2019-02-23T13:56:36Z'),
		EMLMemoNotes: '',
	}, inputData);
};

describe('EMLMemoActionCreate', function test_EMLMemoActionCreate() {

	it('rejects if param1 not object', async function () {
		await rejects(mod.EMLMemoActionCreate(EMLTestingStorageClient, null, StubJournalObjectValid()), /EMLErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), {}), /EMLErrorInputNotValid/);
	});

	it('returns object with EMLErrors if param1 not valid', async function () {
		deepEqual((await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo({
			EMLMemoNotes: null,
		}), StubJournalObjectValid())).EMLErrors, {
			EMLMemoNotes: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns EMLMemo', async function () {
		let item = await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid());

		deepEqual(item, uMemo({
			EMLMemoID: item.EMLMemoID,
			EMLMemoJournalID: item.EMLMemoJournalID,
			EMLMemoCreationDate: item.EMLMemoCreationDate,
			EMLMemoModificationDate: item.EMLMemoModificationDate,
		}));
	});

	it('sets EMLMemoID to unique value', async function () {
		let items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid())).EMLMemoID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMLMemoCreationDate to now', async function () {
		deepEqual(new Date() - (await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid())).EMLMemoCreationDate < 100, true);
	});

	it('sets EMLMemoModificationDate to now', async function () {
		deepEqual(new Date() - (await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid())).EMLMemoModificationDate < 100, true);
	});

});

describe('EMLMemoActionUpdate', function test_EMLMemoActionUpdate() {

	it('rejects if not object', async function () {
		await rejects(mod.EMLMemoActionUpdate(EMLTestingStorageClient, null), /EMLErrorInputNotValid/);
	});

	it('returns object with EMLErrors if not valid', async function () {
		deepEqual((await mod.EMLMemoActionUpdate(EMLTestingStorageClient, Object.assign(await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid()), {
			EMLMemoID: null,
		}))).EMLErrors, {
			EMLMemoID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns EMLMemo', async function () {
		let itemCreated = await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid());

		let item = await mod.EMLMemoActionUpdate(EMLTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			EMLMemoModificationDate: item.EMLMemoModificationDate,
		}));
	});

	it('sets EMLMemoModificationDate to now', async function () {
		deepEqual(new Date() - (await mod.EMLMemoActionUpdate(EMLTestingStorageClient, await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid()))).EMLMemoModificationDate < 100, true);
	});

	it('writes inputData if not found', async function () {
		let item = await mod.EMLMemoActionUpdate(EMLTestingStorageClient, uMemo({
			EMLMemoID: 'alfa',
			EMLMemoCreationDate: new Date(),
			EMLMemoJournalID: StubJournalObjectValid().EMLJournalID,
		}));
		deepEqual(item, uMemo({
			EMLMemoID: item.EMLMemoID,
			EMLMemoJournalID: StubJournalObjectValid().EMLJournalID,
			EMLMemoCreationDate: item.EMLMemoCreationDate,
			EMLMemoModificationDate: item.EMLMemoModificationDate,
		}));
	});

});

describe('EMLMemoActionDelete', function test_EMLMemoActionDelete() {

	it('rejects if param1 not valid', async function () {
		await rejects(mod.EMLMemoActionDelete(EMLTestingStorageClient, {}), /EMLErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mod.EMLMemoActionDelete(EMLTestingStorageClient, uMemo(), {}), /EMLErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mod.EMLMemoActionDelete(EMLTestingStorageClient, await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMLMemo', async function () {
		await mod.EMLMemoActionDelete(EMLTestingStorageClient, await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid()));
		deepEqual(await mod.EMLMemoActionList(EMLTestingStorageClient, StubJournalObjectValid()), []);
	});

});

describe('EMLMemoActionList', function test_EMLMemoActionList() {

	it('returns array', async function () {
		deepEqual(await mod.EMLMemoActionList(EMLTestingStorageClient, StubJournalObjectValid()), []);
	});

	it('returns array with existing EMLMemos', async function () {
		const item = await mod.EMLMemoActionCreate(EMLTestingStorageClient, uMemo(), StubJournalObjectValid());

		deepEqual(await mod.EMLMemoActionList(EMLTestingStorageClient, StubJournalObjectValid()), [item]);
	});

});
