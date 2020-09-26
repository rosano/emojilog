const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;
const EMTMemoAction = require('../EMTMemo/action.js').default;

const uJournal = function (inputData) {
	return Object.assign({
		EMTJournalName: 'alfa',
	}, inputData);
};

describe('EMTJournalActionCreate', function test_EMTJournalActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.EMTJournalActionCreate(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, uJournal({
			EMTJournalName: null,
		}))).EMTErrors, {
			EMTJournalName: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTJournal', async function() {
		let item = await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, uJournal());

		deepEqual(item, uJournal({
			EMTJournalID: item.EMTJournalID,
			EMTJournalCreationDate: item.EMTJournalCreationDate,
			EMTJournalModificationDate: item.EMTJournalModificationDate,
		}));
	});

	it('sets EMTJournalID to unique value', async function() {
		let items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, uJournal())).EMTJournalID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMTJournalCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, uJournal())).EMTJournalCreationDate < 100, true);
	});

	it('sets EMTJournalModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, uJournal())).EMTJournalModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		deepEqual(await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, StubJournalObjectValid()), StubJournalObjectValid());
	});

});

describe('EMTJournalActionUpdate', function test_EMTJournalActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.EMTJournalActionUpdate(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.EMTJournalActionUpdate(EMTTestingStorageClient, Object.assign(await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, StubJournalObjectValid()), {
			EMTJournalID: null,
		}))).EMTErrors, {
			EMTJournalID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTJournal', async function() {
		let itemCreated = await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, StubJournalObjectValid());

		let item = await mainModule.EMTJournalActionUpdate(EMTTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			EMTJournalModificationDate: item.EMTJournalModificationDate,
		}));
	});

	it('sets EMTJournalModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.EMTJournalActionUpdate(EMTTestingStorageClient, await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, StubJournalObjectValid()))).EMTJournalModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.EMTJournalActionUpdate(EMTTestingStorageClient, Object.assign(StubJournalObjectValid(), {
			EMTJournalID: 'alfa',
			EMTJournalCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(StubJournalObjectValid(), {
			EMTJournalID: item.EMTJournalID,
			EMTJournalCreationDate: item.EMTJournalCreationDate,
			EMTJournalModificationDate: item.EMTJournalModificationDate,
		}));
	});

});

describe('EMTJournalActionDelete', function test_EMTJournalActionDelete() {

	it('rejects if not valid', async function() {
		await rejects(mainModule.EMTJournalActionDelete(EMTTestingStorageClient, {}), /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.EMTJournalActionDelete(EMTTestingStorageClient, await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, StubJournalObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMTJournal', async function() {
		await mainModule.EMTJournalActionDelete(EMTTestingStorageClient, await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, StubJournalObjectValid()));
		deepEqual(await mainModule.EMTJournalActionList(EMTTestingStorageClient), []);
	});

	it('deletes EMTMemos', async function () {
		const item = await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, uJournal());

		await EMTMemoAction.EMTMemoActionCreate(EMTTestingStorageClient, {
			EMTMemoEventDate: new Date(),
			EMTMemoNotes: '',
		}, item);

		await mainModule.EMTJournalActionDelete(EMTTestingStorageClient, item);
		deepEqual(await EMTMemoAction.EMTMemoActionList(EMTTestingStorageClient, item), []);
	});

});

describe('EMTJournalActionList', function test_EMTJournalActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.EMTJournalActionList(EMTTestingStorageClient), []);
	});

	it('returns array with existing EMTJournals', async function() {
		let item = await mainModule.EMTJournalActionCreate(EMTTestingStorageClient, StubJournalObjectValid());

		deepEqual(await mainModule.EMTJournalActionList(EMTTestingStorageClient), [item]);
	});

});
