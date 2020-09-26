const { rejects, deepEqual } = require('assert');

const mod = require('./action.js').default;
const EMTMemoStorage = require('./storage.js').default;
const OLSKRemoteStorage = require('OLSKRemoteStorage');

const uMemo = function (inputData) {
	return Object.assign({
		EMTMemoJournalID: 'alfa',
		EMTMemoEventDate: new Date('2019-02-23T13:56:36Z'),
		EMTMemoNotes: '',
	}, inputData);
};

describe('EMTMemoActionCreate', function test_EMTMemoActionCreate() {

	it('rejects if param1 not object', async function () {
		await rejects(mod.EMTMemoActionCreate(EMTTestingStorageClient, null, StubJournalObjectValid()), /EMTErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), {}), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if param1 not valid', async function () {
		deepEqual((await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo({
			EMTMemoNotes: null,
		}), StubJournalObjectValid())).EMTErrors, {
			EMTMemoNotes: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTMemo', async function () {
		let item = await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid());

		deepEqual(item, uMemo({
			EMTMemoID: item.EMTMemoID,
			EMTMemoJournalID: item.EMTMemoJournalID,
			EMTMemoCreationDate: item.EMTMemoCreationDate,
			EMTMemoModificationDate: item.EMTMemoModificationDate,
		}));
	});

	it('sets EMTMemoID to unique value', async function () {
		let items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid())).EMTMemoID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMTMemoCreationDate to now', async function () {
		deepEqual(new Date() - (await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid())).EMTMemoCreationDate < 100, true);
	});

	it('sets EMTMemoModificationDate to now', async function () {
		deepEqual(new Date() - (await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid())).EMTMemoModificationDate < 100, true);
	});

});

describe('EMTMemoActionUpdate', function test_EMTMemoActionUpdate() {

	it('rejects if not object', async function () {
		await rejects(mod.EMTMemoActionUpdate(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function () {
		deepEqual((await mod.EMTMemoActionUpdate(EMTTestingStorageClient, Object.assign(await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid()), {
			EMTMemoID: null,
		}))).EMTErrors, {
			EMTMemoID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTMemo', async function () {
		let itemCreated = await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid());

		let item = await mod.EMTMemoActionUpdate(EMTTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			EMTMemoModificationDate: item.EMTMemoModificationDate,
		}));
	});

	it('sets EMTMemoModificationDate to now', async function () {
		deepEqual(new Date() - (await mod.EMTMemoActionUpdate(EMTTestingStorageClient, await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid()))).EMTMemoModificationDate < 100, true);
	});

	it('writes inputData if not found', async function () {
		let item = await mod.EMTMemoActionUpdate(EMTTestingStorageClient, uMemo({
			EMTMemoID: 'alfa',
			EMTMemoCreationDate: new Date(),
			EMTMemoJournalID: StubJournalObjectValid().EMTJournalID,
		}));
		deepEqual(item, uMemo({
			EMTMemoID: item.EMTMemoID,
			EMTMemoJournalID: StubJournalObjectValid().EMTJournalID,
			EMTMemoCreationDate: item.EMTMemoCreationDate,
			EMTMemoModificationDate: item.EMTMemoModificationDate,
		}));
	});

});

describe('EMTMemoActionDelete', function test_EMTMemoActionDelete() {

	it('rejects if param1 not valid', async function () {
		await rejects(mod.EMTMemoActionDelete(EMTTestingStorageClient, {}), /EMTErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mod.EMTMemoActionDelete(EMTTestingStorageClient, uMemo(), {}), /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mod.EMTMemoActionDelete(EMTTestingStorageClient, await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMTMemo', async function () {
		await mod.EMTMemoActionDelete(EMTTestingStorageClient, await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid()));
		deepEqual(await mod.EMTMemoActionList(EMTTestingStorageClient, StubJournalObjectValid()), []);
	});

});

describe('EMTMemoActionList', function test_EMTMemoActionList() {

	it('returns array', async function () {
		deepEqual(await mod.EMTMemoActionList(EMTTestingStorageClient, StubJournalObjectValid()), []);
	});

	it('returns array with existing EMTMemos', async function () {
		const item = await mod.EMTMemoActionCreate(EMTTestingStorageClient, uMemo(), StubJournalObjectValid());

		deepEqual(await mod.EMTMemoActionList(EMTTestingStorageClient, StubJournalObjectValid()), [item]);
	});

});
